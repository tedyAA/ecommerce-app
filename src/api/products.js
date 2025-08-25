// src/api/products.js
import axios from "axios";

export default {
    index() {
        return axios.get("http://127.0.0.1:3000/api/products");
    }
};
