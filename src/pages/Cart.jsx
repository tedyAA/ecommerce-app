import React, {useEffect, useState} from "react";
import Title from "../components/global/Title.jsx";
import auth from "../api/users/auth.js";
import cart from "../api/users/cart.js";
import {useNavigate} from "react-router-dom";
import CartItem from "../components/CartItem.jsx";


const Cart = () => {
    const [cartItems, setCartItems] = React.useState([]);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const data = await auth.current();
            setUser(data);
            await fetchCart(data.cart_id)
        } catch (error) {
            console.error("Failed to fetch user", error);
        }
    };

    const fetchCart = async (userCartId) => {
        const response = await cart.index(userCartId);
        setCartItems(response.data.cart_items);
    };

    useEffect(() => {
        getUser()
    }, []);

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1='YOUR' text2="CART"/>
            </div>
            {cartItems?.length > 0 ? (
                cartItems.map((item) => (
                    <CartItem
                        item={item}
                        key={item.id}
                        onUpdate={fetchCart}
                        onDelete={fetchCart}
                    />
                ))
            ) : (
                <p>No items in cart</p>
            )}

            <div className="flex items-center justify-between p-4 mt-6">
                <div className="text-xl font-semibold text-gray-800">
                    <Title
                        text1="Grand Total: $"
                        text2={(
                            cartItems.reduce(
                                (acc, item) => acc + item.product.price * item.quantity,
                                0
                            ) / 100
                        ).toFixed(2)}
                    />
                </div>

                <button
                    onClick={() => navigate("/place-order")}
                    className="px-6 py-2 bg-blue-600 text-white text-base font-medium rounded-xl shadow hover:bg-blue-700 transition"
                >
                    Checkout
                </button>
            </div>
        </div>
    )
}
export default Cart;
