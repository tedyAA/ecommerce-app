// src/api/products.js
import axios from "axios";

export default {
    index({ bestseller, per } = {}) {
        const params = [];

        if (per !== undefined && per !== null) {
            params.push(`per=${per}`);
        }

        if (bestseller !== undefined && bestseller !== null) {
            params.push(`bestseller=${bestseller}`);
        }
        const query = params.length ? `?${params.join('&')}` : '';

        return axios.get(`http://127.0.0.1:3000/api/products${query}`);
    },

    show(id) {
        return axios.get(`http://127.0.0.1:3000/api/products/${id}`);
    }
};
