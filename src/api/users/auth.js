import axios from "axios";

export default {
    login(email, password) {
        return axios.post(`http://localhost:3000/api/login`,{ email, password }, { withCredentials: true });
    },
    signup(firstName, lastName, email, password) {
        return axios.post(
            'http://localhost:3000/api/users',
            {
                user: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                }
            },
            { withCredentials: true }
        );
    }

};
