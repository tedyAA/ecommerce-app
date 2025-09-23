import React, { useEffect, useState } from "react";
import auth from "../api/users/auth.js";
import { assets } from "../assets/assets.js";
import UserAvatarModal from "../components/user/UserAvatarModal.jsx";
import { isEmpty } from "lodash";

const Account = () => {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState("Profile");
    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

    const updateUser = async () => {
        try {
            const data = await auth.current();
            setUser(data);
        } catch (error) {
            console.error("Failed to fetch user", error);
        }
    };

    const avatarUrl = () =>
        user && !isEmpty(user.avatar_url)
            ? user.avatar_url
            : "https://placehold.co/200x200";

    useEffect(() => {
        updateUser();
    }, []);

    if (!user)
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <h1 className="text-xl font-semibold text-gray-700">
                        Log in to view all your details 🙂
                    </h1>
                </div>
            </div>
        );

    return (
        <div className="flex flex-row items-start justify-center gap-10 mt-10">
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 w-64">
                <UserAvatarModal
                    isOpen={isAvatarModalOpen}
                    onClose={() => setAvatarModalOpen(false)}
                    currentAvatar={avatarUrl()}
                    onUpdate={updateUser}
                />
                <img
                    src={avatarUrl()}
                    alt="Avatar"
                    className="rounded-full mb-5 w-40 h-40 object-cover border-4 border-gray-200 shadow cursor-pointer hover:opacity-90 transition"
                    onClick={() => setAvatarModalOpen(true)}
                />

                <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full cursor-pointer ${
                        page === "Profile"
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setPage("Profile")}
                >
                    <img src={assets.profile_icon} className="w-5 h-5" />
                    <p>Profile</p>
                </div>

                <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full cursor-pointer ${
                        page === "Orders"
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setPage("Orders")}
                >
                    <img src={assets.cart_icon} className="w-5 h-5" />
                    <p>Orders</p>
                </div>

                <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full cursor-pointer ${
                        page === "Password"
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setPage("Password")}
                >
                    <img src={assets.search_icon} className="w-5 h-5" />
                    <p>Change Password</p>
                </div>
            </div>

            <div className="flex flex-col items-start bg-white rounded-2xl shadow-md p-8 w-[50%]">
                {page === "Profile" && (
                    <div className="w-full">
                        <h1 className="mb-5 text-2xl font-semibold text-gray-800">
                            Welcome, {user.first_name}
                        </h1>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={user.first_name}
                            className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={user.last_name}
                            className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                            Update Account
                        </button>
                    </div>
                )}

                {page === "Orders" && (
                    <div className="w-full text-center text-gray-600">
                        <h1 className="text-lg font-medium">No Orders Yet</h1>
                    </div>
                )}

                {page === "Password" && (
                    <div className="w-full">
                        <h1 className="mb-5 text-xl font-semibold text-gray-800">
                            Change Password
                        </h1>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Enter Old Password
                        </label>
                        <input
                            type="password"
                            placeholder="Old Password"
                            className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Enter New Password
                        </label>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                            Change Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;
