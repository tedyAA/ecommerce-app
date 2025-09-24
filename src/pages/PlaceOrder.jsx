import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import auth from "../api/users/auth.js";
import cart from "../api/users/cart.js";
import orders from "../api/orders.js";

const PlaceOrder = () => {
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [loadingCart, setLoadingCart] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const data = await auth.current();
            setUser(data);
            const cartData = await cart.index(data.cart_id);
            setCartItems(cartData.data.cart_items || []);
        } catch (error) {
            console.error("Failed to fetch user or cart", error);
        } finally {
            setLoadingCart(false);
        }
    };

    useEffect(() => {
        getUser()
    }, []);

    if (loadingCart) return <p>Loading your cart...</p>;

    if (!cartItems.length) {
        return <p className="text-center mt-10 text-gray-600">Your cart is empty.</p>;
    }


    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    ) / 100;

    const placeOrder = async () => {
        if (!address) {
            setError("Please enter a delivery address");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const response = orders.placeOrder(address, paymentMethod, cartItems)

            if (!response.ok) throw new Error("Failed to place order");
            navigate(`/order-success`);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6">Place Your Order</h1>

            <div className="mb-4">
                <label className="block font-medium mb-1">Delivery Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="Enter your address"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Payment Method</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                >
                    <option value="card">Credit/Debit Card</option>
                    <option value="cash">Cash on Delivery</option>
                </select>
            </div>

            <div className="mb-4 text-lg font-semibold">
                Total: ${totalPrice.toFixed(2)}
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <button
                onClick={placeOrder}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
                {loading ? "Placing Order..." : "Place Order"}
            </button>
        </div>
    );
};

export default PlaceOrder;
