import React, {useEffect, useState} from "react";
import Title from "../components/global/Title.jsx";
import auth from "../api/users/auth.js";


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
        const token = localStorage.getItem('auth_token');

        const response = await fetch(`http://127.0.0.1:3000/api/carts/${userCartId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();

        setCartItems(data.cart_items);
        return data.cart_items; // array of items with product info
    };

    useEffect(() => {
        getUser()
    }, []);

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1='YOUR' text2="CART"/>
            </div>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div className="flex" key={item.id}>
                        <p className="mx-2">{item.product.name}</p>
                        <p>{item.product.price / 100}$</p>
                    </div>
                ))
            ) : (
                <p>No items in cart</p>
            )}

            <div className='text-2xl mb-3 mt-6'>
                    <Title text1='Grand Total: $' text2={(
                        cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) / 100
                    ).toFixed(2)}/>
                </div>
        </div>
)
}
export default Cart;
