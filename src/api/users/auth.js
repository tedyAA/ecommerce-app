import axios from "axios";

const API_URL = "http://localhost:3000/api/";

export default {
    login(email, password) {
        return axios.post(`${API_URL}login`, { email, password }, { withCredentials: true });
    },

    signup(firstName, lastName, email, password) {
        return axios.post(
            `${API_URL}users`,
            {
                user: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                },
            },
            { withCredentials: true }
        );
    },

    async current() {
        const token = localStorage.getItem("auth_token");
        try {
            if (!token) return null;
            const response = await axios.get(`${API_URL}current_user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            console.error("Unable to fetch current user:", err);
            if (err?.response?.status === 401) {
                localStorage.removeItem("auth_token");
                window.location.href = "/login";
            }
            return null;
        }
    },

    async updateAvatar(file) {
        if (!file) throw new Error("No file provided");

        const token = localStorage.getItem("auth_token");
        if (!token) throw new Error("No auth token found");

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const response = await axios.patch(
                `${API_URL}users/update_avatar`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (err) {
            console.error("Avatar upload failed:", err.response?.data || err);
            throw err;
        }
    },
};
