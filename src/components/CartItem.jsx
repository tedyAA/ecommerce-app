import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const productImage = () =>
        item?.product?.image_urls?.[0] || "https://placehold.co/600x400?font=roboto";

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-gray-100 shadow-sm border mb-3">
            <Link to={`/product/${item.product.id}`}>
                <img
                    src={productImage()}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover"
                />
            </Link>

            <div className="flex flex-col flex-1">
                <p className="text-lg font-semibold text-gray-800">{item.product.name}</p>
                <p className="text-sm text-gray-500">{item.product.description}</p>

                <div className="flex items-center justify-between mt-2 gap-2">
                    <p className="text-base font-bold text-gray-900">
                        ${(item.product.price / 100 * quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            className="w-16 px-2 py-1 border rounded"
                        />
                        <button
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            Update
                        </button>
                        <button
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired, // cart item ID
        quantity: PropTypes.number.isRequired,
        product: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.number.isRequired,
            image_urls: PropTypes.arrayOf(PropTypes.string),
        }).isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CartItem;
