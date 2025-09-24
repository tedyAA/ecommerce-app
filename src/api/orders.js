import axios from "axios";

export default {
    placeOrder(address, paymentMethod, cartItems) {
        const token = localStorage.getItem("auth_token");
        console.log(token);

        return axios.post(
            "http://localhost:3000/api/orders",
            {
                order: {
                    address,
                    payment_method: paymentMethod,
                    cart_items: cartItems.map((item) => ({
                        product_id: item.product.id,
                        quantity: item.quantity,
                    })),
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },
};
