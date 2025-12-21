import { Order } from '../App';
import { Clock, Package, CheckCircle, ShoppingBag } from 'lucide-react';

type OrderHistoryProps = {
  orders: Order[];
};

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  preparing: {
    label: 'Preparing',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  ready: {
    label: 'Ready for Pickup',
    icon: ShoppingBag,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
};

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Package className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No orders yet</h2>
        <p className="text-gray-500">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Order History</h2>

      <div className="space-y-6">
        {orders.map(order => {
          const statusConfig = STATUS_CONFIG[order.status];
          const StatusIcon = statusConfig.icon;

          return (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor}`}>
                  <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                  <span className={`text-sm font-semibold ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>

              {/* Order Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  {Object.entries(STATUS_CONFIG).map(([status, config], index) => {
                    const Icon = config.icon;
                    const isActive = 
                      status === order.status ||
                      (order.status === 'preparing' && status === 'pending') ||
                      (order.status === 'ready' && ['pending', 'preparing'].includes(status)) ||
                      (order.status === 'completed' && status !== 'completed');
                    
                    return (
                      <div key={status} className="flex items-center flex-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive ? config.bgColor : 'bg-gray-100'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? config.color : 'text-gray-400'}`} />
                        </div>
                        {index < Object.keys(STATUS_CONFIG).length - 1 && (
                          <div
                            className={`flex-1 h-1 mx-2 ${
                              isActive ? 'bg-orange-500' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-4 space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.menuItem.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                        {item.size && ` • ${item.size}`}
                      </p>
                    </div>
                    <p className="font-semibold">£{item.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Delivery Method: Pickup</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-xl font-semibold text-orange-500">
                    £{order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
