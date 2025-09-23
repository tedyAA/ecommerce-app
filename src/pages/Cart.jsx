import React, {useEffect, useState} from "react";
import Title from "../components/global/Title.jsx";
import auth from "../api/users/auth.js";
import cart from "../api/users/cart.js";


const Cart = () => {
    const [cartItems, setCartItems] = React.useState([]);
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const data = await auth.current();
            setUser(data);
            fetchCart(data.cart_id)
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
                    <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border mb-3"
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
                    className="px-6 py-2 bg-blue-600 text-white text-base font-medium rounded-xl shadow hover:bg-blue-700 transition">
                    Checkout
                </button>
            </div>
        </div>
    )
}
export default Cart;
