import React, { useEffect } from "react";
import Title from "../components/global/Title.jsx";
import auth from "../api/users/auth.js";
import cartApi from "../api/users/cart.js";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCart, removeItem, updateQuantity } from "../store/slices/cartSlice";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const cartItems = cart.items || [];

    useEffect(() => {
        const fetchUserAndCart = async () => {
            try {
                const user = await auth.current();
                const response = await cartApi.index(user.cart_id);
                dispatch(setCart(response.data));
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };

        fetchUserAndCart();
    }, [dispatch]);

    const handleUpdate = (updatedItem) => {
        dispatch(updateQuantity({ id: updatedItem.id, quantity: updatedItem.quantity }));
    };

    const handleDelete = (id) => {
        dispatch(removeItem(id));
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1="YOUR" text2="CART" />
            </div>

            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <p className="text-gray-500 mt-6">No items in cart</p>
            )}

            <div className="flex items-center justify-between p-4 mt-6 border-t">
                <div className="text-xl font-semibold text-gray-800">
                    <Title
                        text1="Grand Total: $"
                        text2={(total / 100).toFixed(2)}
                    />
                </div>

                <button
                    onClick={() => navigate("/place-order")}
                    disabled={cartItems.length === 0}
                    className={`px-6 py-2 rounded-xl shadow transition text-base font-medium ${
                        cartItems.length === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
