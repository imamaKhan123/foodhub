/// <reference types="vite/client" />

import { useState, useEffect } from 'react';
import { startSignalRConnection, subscribeNewOrder, subscribeOrderUpdated, unsubscribeNewOrder, unsubscribeOrderUpdated, stopSignalRConnection } from './utils/signalr';
import { MenuBrowser } from './components/MenuBrowser';
import { Cart } from './components/Cart';
import { OrderHistory } from './components/OrderHistory';
import { Auth } from './components/Auth';
import { About } from './components/About';
import { Support } from './components/Support';
import { Footer } from './components/Footer';
import { ShoppingCart, History, Menu, Search, User, LogOut, MoreHorizontal, HelpCircle, Info, Home, Moon, Sun, X } from 'lucide-react';

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  image: string;
  sizes?: { name: string; price: number }[];
  availableAddOns?: { id : number ;name: string; price: number }[];
};

export type CartItem = {
  id: number;
  menuItem: MenuItem;
  size?: string;
  quantity: number;
  addOns: { id: number; name: string; price: number }[];
  totalPrice: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  deliveryMethod: 'pickup';
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
  updatedAt: Date;
};

export default function App() {
  const [currentView, setCurrentView] = useState<'menu' | 'cart' | 'history' | 'about' | 'support'>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<{ accessToken: string; name: string; email: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Apply/remove `dark` class on document root so Tailwind dark: styles work
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [isDarkMode]);

  // Check for existing session on mount
  useEffect(() => {
    const checkStoredAuth = () => {
      try {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          setUser(authData);
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
        localStorage.removeItem('auth');
      } finally {
        setLoading(false);
      }
    };

    checkStoredAuth();
  }, []);
    useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Menu`);
        const data: MenuItem[] = await res.json();
        console.log('Fetched menu data:', data);
        setMenuItems(data);
  
        // Build categories dynamically
        const uniqueCategories = Array.from(
          new Set(data.map(item => item.category))
        );
  
        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        console.error('Failed to fetch menu', err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchMenu();
  }, []);

  // Fetch orders when user logs in
  useEffect(() => {
    if (user?.accessToken) {
      fetchOrders();
    }
  }, [user?.accessToken]);

  // Setup SignalR realtime subscriptions when user is logged in
  useEffect(() => {
    let mounted = true;

    const onNewOrder = (payload: any) => {
      // payload expected to contain the new order under `data` or as the object itself
      const newOrder = payload?.data ?? payload;
        console.debug('SignalR onNewOrder payload:', payload);
        if (!newOrder || !newOrder.id) return;

      // Normalize date fields if the server sends ISO strings
      const parsedOrder = {
        ...newOrder,
        createdAt: newOrder.createdAt ? new Date(newOrder.createdAt) : new Date(),
        updatedAt: newOrder.updatedAt ? new Date(newOrder.updatedAt) : new Date(),
      };

      setOrders(prev => [parsedOrder, ...prev]);
    };

    const onOrderUpdated = (payload: any) => {
      console.log('Received order update via SignalR:', payload);
      console.debug('SignalR onOrderUpdated payload:', payload);
      // Server sends the complete order object on updates. Replace local order with server copy.
      const updated = payload?.data ?? payload;
      if (!updated || !updated.id) return;

      const parsedOrder = {
        ...updated,
        createdAt: updated.createdAt ? new Date(updated.createdAt) : new Date(),
        updatedAt: updated.updatedAt ? new Date(updated.updatedAt) : new Date(),
      };

      setOrders(prev => {
        const exists = prev.some(o => o.id === parsedOrder.id);
        if (exists) {
          return prev.map(o => (o.id === parsedOrder.id ? parsedOrder : o));
        }
        // If order wasn't present locally, add it to the front
        return [parsedOrder, ...prev];
      });
    };

    async function initRealtime() {
      try {
        await startSignalRConnection(undefined, user?.accessToken);
        // Subscribe both for new orders and updates
        // onNewOrder used to append freshly created orders
        // onOrderUpdated replaces a matching order with server copy
        subscribeNewOrder(onNewOrder);
        subscribeOrderUpdated(onOrderUpdated);
      } catch (err) {
        console.warn('Failed to start SignalR connection', err);
      }
    }

    if (user?.accessToken && mounted) {
      initRealtime();
    }

    return () => {
      mounted = false;
      // Unsubscribe handlers; we keep connection running so other pages/components may reuse it.
      unsubscribeNewOrder(onNewOrder);
      unsubscribeOrderUpdated(onOrderUpdated);
      // Optionally stop connection when no user, but keep it for dev convenience.
      // stopSignalRConnection();
    };
  }, [user?.accessToken]);

const fetchOrders = async () => {
  if (!user?.accessToken) return;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/history`, {
      headers: { 'Authorization': `Bearer ${user.accessToken}` }
    });

    if (!response.ok) {
      // Backend now returns JSON error
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch menu');
    }

    const data = await response.json();
    console.log('Fetched Order History data:', data);
    setOrders(data.data)// or map to your Order type if needed
  } catch (error: any) {
    console.error('Error fetching orders:', error.message);
    alert(`Error fetching menu: ${error.message}`);
  }
};


  const handleAuthSuccess = (accessToken: string, userName: string, email: string) => {
    const userData = { accessToken, name: userName, email };
    setUser(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
    setShowAuth(false);
  };

  const handleLogout = async () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('auth');
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    setCart(prev => prev.map(item => item.id.toString() === id ? { ...item, ...updates } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id.toString() !== id));
  };

const placeOrder = async () => {
  if (cart.length === 0) return;

  if (!user?.accessToken) {
    setShowAuth(true);
    return;
  }

  // Map cart items to backend DTO
  const itemsDTO = cart.map(item => ({
    menuItemId: Number(item.menuItem.id),       // convert string ID to number
    quantity: item.quantity,
    size: item.size || '',
    AddOns: item.addOns // convert add-on IDs to numbers
  }));

  const newOrderDTO = {
    items: itemsDTO,
    deliveryMethod: 'pickup' // or whatever the user selected
  };

  try {
    console.log('Placing order:', newOrderDTO);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`
      },
      body: JSON.stringify(newOrderDTO)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error:', errorText);
      throw new Error('Failed to save order');
    }

    const data = await response.json();
    console.log('Order saved successfully:', data);

    // Save locally for UI
    setOrders(prev => [data.data, ...prev]); // data.data should be the returned OrderDTO
    setCart([]);
    setCurrentView('history');

    // Simulate order status progression
    setTimeout(() => updateOrderStatus(data.data.id, 'preparing'), 5000);
    // setTimeout(() => updateOrderStatus(data.data.id, 'ready'), 8000);
    // setTimeout(() => updateOrderStatus(data.data.id, 'completed'), 15000);
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Failed to place order. Please try again.');
  }
};


  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    // Update locally first
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date() }
        : order
    ));

    // Update on server if user is logged in
    if (user?.accessToken) {
      try {
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
          },
          body: JSON.stringify({ status })
        });
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`transition-colors duration-300 shadow-sm sticky top-0 z-10 ${isDarkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2 lg:gap-4">
            <button onClick={() => setCurrentView('menu')} className="focus:outline-none hover:opacity-80 transition-opacity">
              <img src="/assets/icon.jpeg" alt="Chicko Chicken" className="h-8 w-16" />
            </button>
            
            {/* Desktop: Search Bar, Nav, Orders, Auth */}
            <div className="hidden lg:flex items-center gap-3 flex-1 min-w-0">
              {/* Search Bar */}
              <div className="flex-1 max-w-md relative">
                <Search className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
                />
              </div>

              <nav className="flex gap-1 sm:gap-2 overflow-x-auto">
                <button
                  onClick={() => setCurrentView('menu')}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    currentView === 'menu'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Menu className="w-5 h-5" />
                  <span className="hidden sm:inline">Menu</span>
                </button>
                <button
                  onClick={() => setCurrentView('cart')}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 relative ${
                    currentView === 'cart'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </nav>

              <button
                onClick={() => setCurrentView('history')}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  currentView === 'history'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <History className="w-5 h-5" />
                <span className="hidden sm:inline">Orders</span>
              </button>

              <button
                onClick={() => setCurrentView('about')}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  currentView === 'about'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Info className="w-5 h-5" />
                <span className="hidden sm:inline">About</span>
              </button>

              <button
                onClick={() => setCurrentView('support')}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  currentView === 'support'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Support</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Authentication */}
              {user ? (
                <div className="flex items-center gap-2 ml-auto">
                  <div className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline text-sm truncate">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 bg-orange-500 text-white hover:bg-orange-600 shadow-md"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile: Nav (Home, Cart), Three dots */}
            <div className="lg:hidden flex items-center gap-2">
              <nav className="flex gap-1">
                <button
                  onClick={() => setCurrentView('menu')}
                  className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                    currentView === 'menu'
                      ? 'bg-orange-500 text-white shadow-md'
                      : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Home className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView('cart')}
                  className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-all duration-200 relative ${
                    currentView === 'cart'
                      ? 'bg-orange-500 text-white shadow-md'
                      : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </nav>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MoreHorizontal className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden shadow-lg border-t p-4 transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
              />
            </div>
          </div>

          {/* Menu */}
          <button
            onClick={() => { setCurrentView('menu'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-200 mb-4 ${
              currentView === 'menu'
                ? 'bg-orange-500 text-white shadow-md'
                : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Menu className="w-5 h-5" />
            Menu
          </button>

          {/* Orders */}
          <button
            onClick={() => { setCurrentView('history'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-200 mb-4 ${
              currentView === 'history'
                ? 'bg-orange-500 text-white shadow-md'
                : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <History className="w-5 h-5" />
            Orders
          </button>

          {/* About */}
          <button
            onClick={() => { setCurrentView('about'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-200 mb-4 ${
              currentView === 'about'
                ? 'bg-orange-500 text-white shadow-md'
                : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Info className="w-5 h-5" />
            About Us
          </button>

          {/* Support */}
          <button
            onClick={() => { setCurrentView('support'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-200 mb-4 ${
              currentView === 'support'
                ? 'bg-orange-500 text-white shadow-md'
                : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            Support
          </button>

          {/* User Authentication */}
          {user ? (
            <div className="flex items-center justify-between gap-2">
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <User className="w-5 h-5" />
                <span className="text-sm truncate">{user.name}</span>
              </div>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-white ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setShowAuth(true); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-200 bg-orange-500 text-white hover:bg-orange-600 shadow-md"
            >
              <User className="w-5 h-5" />
              Sign In
            </button>
          )}
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <Auth
          onClose={() => setShowAuth(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 pt-20 pb-24 transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50'}`}>
        {currentView === 'menu' && <MenuBrowser menuItems={menuItems} categories={categories}  onAddToCart={addToCart} searchQuery={searchQuery} />}
        {currentView === 'cart' && (
          <Cart
            items={cart}
            onUpdateItem={updateCartItem}
            onRemoveItem={removeFromCart}
            onPlaceOrder={placeOrder}
          />
        )}
        {currentView === 'history' && <OrderHistory orders={orders} />}
        {currentView === 'about' && <About />}
        {currentView === 'support' && <Support />}
      </main>

      {/* Footer */}
      <Footer onNavigate={(view) => setCurrentView(view)} isDarkMode={isDarkMode} />
    </div>
  );
}