"use client";

import { useOrders } from "@/context/OrderContext";

export default function OrdersPage() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return <div className="p-6">No orders yet 📦</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-xl">
          <p className="text-sm text-gray-500">
            {new Date(order.date).toLocaleString()}
          </p>

          {order.items.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}