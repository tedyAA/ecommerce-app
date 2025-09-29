import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const CartItem = ({item}) => {
    return (
        <Link>
            <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border-gray-100 shadow-sm border mb-3"
            >
                <img
                    src="https://placehold.co/100x100"
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex flex-col flex-1">
                    <p className="text-lg font-semibold text-gray-800">{item.product.name}</p>
                    <p className="text-sm text-gray-500">{item.product.description}</p>

                    <div className="flex items-center justify-between mt-2">
                        <p className="text-base font-bold text-gray-900">
                            ${(item.product.price / 100 * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        product: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.number.isRequired,
            image_urls: PropTypes.arrayOf(PropTypes.string)
        }).isRequired
    }).isRequired
};

export default CartItem;
