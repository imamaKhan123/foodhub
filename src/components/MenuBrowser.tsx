import { useState } from 'react';
import { MenuItem } from '../App';
import { ItemDetailsModal } from './ItemDetailsModal';

import { MENU_DATA, CATEGORIES } from '../Data/SampleData';




type MenuBrowserProps = {
  onAddToCart: (item: any) => void;
  searchQuery?: string;
};

export function MenuBrowser({ onAddToCart, searchQuery = '' }: MenuBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Filter by category first
  let filteredItems =
    selectedCategory === 'All'
      ? MENU_DATA
      : MENU_DATA.filter(item => item.category === selectedCategory);

  // Then filter by search query
  if (searchQuery.trim()) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  // Group items by category for "All" view
  const itemsByCategory: { [key: string]: MenuItem[] } = {};
  if (selectedCategory === 'All') {
    filteredItems.forEach(item => {
      if (!itemsByCategory[item.category]) {
        itemsByCategory[item.category] = [];
      }
      itemsByCategory[item.category].push(item);
    });
  }
 return (
    <div>
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Display */}
      {selectedCategory === 'All' ? (
        // Grouped by category view
        <div className="space-y-8">
          {CATEGORIES.filter(cat => cat !== 'All' && itemsByCategory[cat]?.length > 0).map(category => (
            <div key={category}>
              <h2 className="text-gray-900 text-xl font-semibold mb-6 pb-4 border-b-2 border-orange-500">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {itemsByCategory[category].map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-500 font-semibold">
                          £{item.basePrice.toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(item);
                          }}
                          className="bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Regular grid view for specific categories
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-500 font-semibold">
                    £{item.basePrice.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                    }}
                    className="bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Details Modal */}
      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}