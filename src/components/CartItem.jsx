import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Trash2, Minus, Plus } from "lucide-react";
import cartApi from "../api/users/cart.js";

const CartItem = ({ item, onUpdate, onDelete }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const productImage = () =>
        item?.product?.image_urls?.[0] || "https://placehold.co/600x400?font=roboto";

    useEffect(() => {
        if (quantity < 1 || quantity === item.quantity) return;

        const timeout = setTimeout(async () => {
            setUpdating(true);
            try {
                const res = await cartApi.updateCartItem(item.id,quantity)
                onUpdate(res.data);
            } catch (err) {
                console.error("Update failed:", err.response?.data || err.message);
            } finally {
                setUpdating(false);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [quantity]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await cartApi.deleteCartItem(item.id);
            onDelete(item.id);
        } catch (err) {
            console.error("Delete failed:", err.response?.data || err.message);
        } finally {
            setDeleting(false);
        }
    };

    const handleIncrease = () => setQuantity((q) => q + 1);
    const handleDecreaseOrDelete = () =>
        quantity === 1 ? handleDelete() : setQuantity((q) => q - 1);

    return (
        <div className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 mb-4">
            <Link to={`/product/${item.product.id}`} className="shrink-0">
                <img
                    src={productImage()}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-xl object-cover hover:scale-105 transition-transform duration-300"
                />
            </Link>

            <div className="flex flex-col flex-1">
                <p className="text-lg font-semibold text-gray-800">{item.product.name}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{item.product.description}</p>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold text-gray-900 tracking-tight">
                        ${(item.product.price / 100 * quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 shadow-sm px-1 py-1">
                        <button
                            onClick={handleDecreaseOrDelete}
                            disabled={deleting || updating}
                            className={`p-1 rounded-full transition-all duration-200 ${
                                quantity === 1
                                    ? "hover:bg-red-100 hover:text-red-600"
                                    : "hover:bg-gray-200"
                            }`}
                        >
                            {quantity === 1 ? (
                                <Trash2
                                    size={14}
                                    className={`${
                                        deleting ? "animate-pulse text-red-500" : "text-red-500"
                                    }`}
                                />
                            ) : (
                                <Minus size={14} />
                            )}
                        </button>

                        <span
                            className={`mx-2 text-md font-semibold min-w-[0.5rem] text-center ${
                                updating ? "opacity-50" : "text-gray-800"
                            }`}
                        >
              {quantity}
            </span>

                        <button
                            onClick={handleIncrease}
                            disabled={updating}
                            className="p-1 rounded-full hover:bg-gray-200 transition-all duration-200"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
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
