import axios from "axios";
import {isEmpty} from "lodash";

export default {
    index({ bestseller, per, categories, typeId } = {}) {
        const params = [];

        if (!isEmpty(per)) {
            params.push(`per=${per}`);
        }

        if (!isEmpty(bestseller)) {
            params.push(`bestseller=${bestseller}`);
        }

        if (!isEmpty(categories)) {
            params.push(`category=${categories}`);
        }

        if (!isEmpty(typeId)) {
            params.push(`type=${typeId}`);
        }
        const query = params.length ? `?${params.join('&')}` : '';
        return axios.get(`http://127.0.0.1:3000/api/products${query}`);
    },

    show(id) {
        return axios.get(`http://127.0.0.1:3000/api/products/${id}`);
    }
};
