import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api";

const cartApi = {
    index(userCartId) {
        const token = localStorage.getItem('auth_token');
        return axios.get(`${API_URL}/carts/${userCartId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    addToCart(productId, quantity = 1) {
        const token = localStorage.getItem('auth_token');
        return axios.post(`${API_URL}/cart_items`,
            { product_id: productId, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    }
};

export default cartApi;
