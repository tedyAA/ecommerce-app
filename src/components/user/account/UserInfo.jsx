import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../../store/slices/userSlice";
import auth from "../../../api/users/auth.js";


const UserInfo = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
    });

    if (!user?.isAuthenticated) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {

        try {
            const res = auth.updateUser(user.id,form)

            const updated = res.data.user;

            setForm({
                first_name: updated.first_name || "",
                last_name: updated.last_name || "",
                email: updated.email || "",
                phone: updated.phone || "",
            });
            dispatch(fetchCurrentUser());
        } catch (err) {
            console.error("Update failed:", err.response?.data || err.message);
        }
    };

    return (
        <div className="w-full max-w-lg">
            <h1 className="mb-5 text-2xl font-semibold text-gray-800">
                Welcome, {form.first_name}
            </h1>

            <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
            <input
                type="text"
                name="first_name"
                value={form.first_name || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
            <input
                type="text"
                name="last_name"
                value={form.last_name || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
                type="email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <input
                type="text"
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleSubmit}
                className={`px-5 py-2 rounded-lg shadow w-full lg:w-auto transition bg-blue-600 text-white hover:bg-blue-700`}
            >
                Update Account
            </button>
        </div>
    );
};

export default UserInfo;
