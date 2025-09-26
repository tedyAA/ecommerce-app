import React from "react";

interface Order {
    id: number;
    status: string;
    total_cents: number;
    created_at: string;
}

interface OrdersInfoProps {
    order: Order;
}

const OrdersInfo: React.FC<OrdersInfoProps> = ({ order }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
            <p className="font-medium text-gray-700 mb-2">Order #{order.id}</p>
            <p className="text-gray-600 mb-2">
                Status: <span className="font-semibold">{order.status}</span>
            </p>
            <p className="text-gray-600 mb-2">
                Total: <span className="font-semibold">${(order.total_cents / 100).toFixed(2)}</span>
            </p>
            <p className="text-gray-500 text-sm">
                Placed on: {new Date(order.created_at).toLocaleDateString()}
            </p>
        </div>
    );
};

export default OrdersInfo;
