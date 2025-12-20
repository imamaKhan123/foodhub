import { useState } from 'react';
import { MenuItem, CartItem } from '../App';
import { X, Plus, Minus } from 'lucide-react';

type ItemDetailsModalProps = {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
};

export function ItemDetailsModal({ item, onClose, onAddToCart }: ItemDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]?.name || '');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnName)
        ? prev.filter(name => name !== addOnName)
        : [...prev, addOnName]
    );
  };

  const calculateTotalPrice = () => {
    let total = item.basePrice;

    // Add size price
    if (selectedSize && item.sizes) {
      const size = item.sizes.find(s => s.name === selectedSize);
      if (size) total += size.price;
    }

    // Add add-ons price
    if (item.addOns) {
      selectedAddOns.forEach(addOnName => {
        const addOn = item.addOns?.find(a => a.name === addOnName);
        if (addOn) total += addOn.price;
      });
    }

    return total * quantity;
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: '', // Will be set in App
      menuItem: item,
      size: selectedSize,
      quantity,
      addOns: selectedAddOns,
      totalPrice: calculateTotalPrice(),
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-orange-500 font-semibold mt-2">
              Base Price: £{item.basePrice.toFixed(2)}
            </p>
          </div>

          {/* Size Selection */}
          {item.sizes && item.sizes.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="grid grid-cols-2 gap-3">
                {item.sizes.map(size => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedSize === size.name
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{size.name}</div>
                    {size.price > 0 && (
                      <div className="text-sm text-gray-600">+£{size.price.toFixed(2)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {item.addOns && item.addOns.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Add-ons (Optional)</h3>
              <div className="space-y-2">
                {item.addOns.map(addOn => (
                  <label
                    key={addOn.name}
                    className="flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors hover:border-gray-300"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedAddOns.includes(addOn.name)}
                        onChange={() => toggleAddOn(addOn.name)}
                        className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span>{addOn.name}</span>
                    </div>
                    <span className="text-gray-600">+£{addOn.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            Add to Cart - £{calculateTotalPrice().toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
