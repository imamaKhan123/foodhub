import { useState, useEffect } from 'react';
import { MenuBrowser } from './components/MenuBrowser';
import { Cart } from './components/Cart';
import { OrderHistory } from './components/OrderHistory';
import { Auth } from './components/Auth';
import { ShoppingCart, History, Menu, Search, User, LogOut } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  image: string;
  sizes?: { name: string; price: number }[];
  addOns?: { name: string; price: number }[];
};

export type CartItem = {
  id: string;
  menuItem: MenuItem;
  size?: string;
  quantity: number;
  addOns: string[];
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

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            accessToken: session.access_token,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || ''
          });
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser({
            accessToken: session.access_token,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || ''
          });
          setShowAuth(false);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setOrders([]);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Fetch orders when user logs in
  useEffect(() => {
    if (user?.accessToken) {
      fetchOrders();
    }
  }, [user?.accessToken]);

  const fetchOrders = async () => {
    if (!user?.accessToken) return;

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3ff7222b/orders`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched orders from backend:', data.orders);
        const parsedOrders = data.orders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt)
        }));
        setOrders(parsedOrders);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch orders:', errorText);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAuthSuccess = (accessToken: string, userName: string) => {
    // User state will be set by onAuthStateChange listener
    setShowAuth(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    // Check if user is logged in
    if (!user?.accessToken) {
      setShowAuth(true);
      return;
    }

    const newOrder: Order = {
      id: '', // Will be assigned by server
      items: cart,
      totalAmount: cart.reduce((sum, item) => sum + item.totalPrice, 0),
      deliveryMethod: 'pickup',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      console.log('Placing order:', newOrder);
      
      // Save order to backend
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3ff7222b/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({
          ...newOrder,
          createdAt: newOrder.createdAt.toISOString(),
          updatedAt: newOrder.updatedAt.toISOString()
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error('Failed to save order');
      }

      const data = await response.json();
      console.log('Order saved successfully:', data);
      
      const savedOrder = { ...newOrder, id: data.orderId };

      setOrders(prev => [savedOrder, ...prev]);
      setCart([]);
      setCurrentView('history');

      // Simulate order status progression
      setTimeout(() => updateOrderStatus(savedOrder.id, 'preparing'), 3000);
      setTimeout(() => updateOrderStatus(savedOrder.id, 'ready'), 8000);
      setTimeout(() => updateOrderStatus(savedOrder.id, 'completed'), 15000);
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
        await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3ff7222b/orders/${orderId}`, {
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
            <h1 className="font-bold text-gray-900 whitespace-nowrap">Chicko Chicken</h1>
            
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
            </nav>

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
        </div>
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <Auth
          onClose={() => setShowAuth(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'menu' && <MenuBrowser onAddToCart={addToCart} searchQuery={searchQuery} />}
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