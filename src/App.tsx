/// <reference types="vite/client" />

import { useState, useEffect } from 'react';
import { startSignalRConnection, subscribeNewOrder, subscribeOrderUpdated, unsubscribeNewOrder, unsubscribeOrderUpdated, stopSignalRConnection } from './utils/signalr';
import { MenuBrowser } from './components/MenuBrowser';
import { Cart } from './components/Cart';
import { OrderHistory } from './components/OrderHistory';
import { Auth } from './components/Auth';
import { ShoppingCart, History, Menu, Search, User, LogOut, MoreHorizontal } from 'lucide-react';

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
  const [currentView, setCurrentView] = useState<'menu' | 'cart' | 'history'>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<{ accessToken: string; name: string; email: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
const [categories, setCategories] = useState<string[]>(['All']);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => setCurrentView('menu')} className="focus:outline-none">
              <img src="/assets/icon.jpeg" alt="Chicko Chicken" className="h-8 w-16" />
            </button>
            
            {/* Desktop: Search Bar, Nav, Orders, Auth */}
            <div className="hidden lg:flex items-center gap-4 flex-1">
              {/* Search Bar */}
              <div className="flex-1 max-w-md relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <nav className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => setCurrentView('menu')}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'menu'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Menu className="w-5 h-5" />
                  <span className="hidden sm:inline">Menu</span>
                </button>
                <button
                  onClick={() => setCurrentView('cart')}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors relative ${
                    currentView === 'cart'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </nav>

              <button
                onClick={() => setCurrentView('history')}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'history'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <History className="w-5 h-5" />
                <span className="hidden sm:inline">Orders</span>
              </button>

              {/* User Authentication */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <User className="w-5 h-5 text-gray-700" />
                    <span className="hidden sm:inline text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors bg-orange-500 text-white hover:bg-orange-600"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile: Nav (Cart), Three dots */}
            <div className="lg:hidden flex items-center gap-2">
              <nav className="flex gap-1">
                <button
                  onClick={() => setCurrentView('cart')}
                  className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-colors relative ${
                    currentView === 'cart'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </nav>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <MoreHorizontal className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t p-4">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Menu */}
          <button
            onClick={() => { setCurrentView('menu'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-colors mb-4 ${
              currentView === 'menu'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Menu className="w-5 h-5" />
            Menu
          </button>

          {/* Orders */}
          <button
            onClick={() => { setCurrentView('history'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-colors mb-4 ${
              currentView === 'history'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <History className="w-5 h-5" />
            Orders
          </button>

          {/* User Authentication */}
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setShowAuth(true); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-colors bg-orange-500 text-white hover:bg-orange-600"
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
      <main className="max-w-7xl mx-auto px-4 py-8">
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
      </main>
    </div>
  );
}