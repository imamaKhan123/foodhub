import { CartItem } from '../App';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

type CartProps = {
  items: CartItem[];
  onUpdateItem: (id: string, updates: Partial<CartItem>) => void;
  onRemoveItem: (id: string) => void;
  onPlaceOrder: () => void;
};

export function Cart({ items, onUpdateItem, onRemoveItem, onPlaceOrder }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add some delicious items to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      <div className="space-y-4 mb-8">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
          >
            <img
              src={item.menuItem.image}
              alt={item.menuItem.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="font-semibold mb-1">{item.menuItem.name}</h3>
              
              {item.size && (
                <p className="text-sm text-gray-600">Size: {item.size}</p>
              )}
              
              {item.addOns.length > 0 && (
                <p className="text-sm text-gray-600">
                  Add-ons: {item.addOns.join(', ')}
                </p>
              )}

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => {
                    const newQuantity = Math.max(1, item.quantity - 1);
                    const newTotalPrice = (item.totalPrice / item.quantity) * newQuantity;
                    onUpdateItem(item.id, { quantity: newQuantity, totalPrice: newTotalPrice });
                  }}
                  className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                
                <button
                  onClick={() => {
                    const newQuantity = item.quantity + 1;
                    const newTotalPrice = (item.totalPrice / item.quantity) * newQuantity;
                    onUpdateItem(item.id, { quantity: newQuantity, totalPrice: newTotalPrice });
                  }}
                  className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <p className="font-semibold text-orange-500">
              £{item.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax (8%)</span>
            <span>£{tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-orange-500">£{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm">
            <span className="font-semibold">Delivery Method:</span> Pickup
          </p>
        </div>

        <button
          onClick={onPlaceOrder}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
