import axios from "axios";

export default {
    index(userCartId) {
        const token = localStorage.getItem('auth_token');
        return axios.get(`http://127.0.0.1:3000/api/carts/${userCartId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }
};
