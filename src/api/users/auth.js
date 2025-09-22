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
    },
    async current() {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) return null;

            const response = await axios.get('http://localhost:3000/api/current_user', {
                headers: {Authorization: `Bearer ${token}`},
            });
            return response.data;
        } catch (err) {
            console.error('Unable to fetch current user:', err);
            if(err.status === 401){
                localStorage.removeItem("auth_token");
                window.location.href = "/login";
            }
            return null;
        }
    }
};
