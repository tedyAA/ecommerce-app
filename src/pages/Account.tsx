import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import UserAvatarModal from "../components/user/UserAvatarModal.jsx";
import { isEmpty } from "lodash";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { fetchCurrentUser } from "../store/slices/userSlice";
import UserInfo from "../components/user/account/UserInfo";
import {fetchOrders} from "../store/slices/orderSlice";
import OrdersInfo from "../components/user/account/OrdersInfo";

interface Order {
    id: number;
    status: string;
    total_cents: number;
    created_at: string;
}

const Account: React.FC = () => {
    const [page, setPage] = useState<"Profile" | "Orders" | "Password">("Profile");
    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const orders = useSelector((state: RootState) => state.orders.list);

    const avatarUrl = () =>
        user && !isEmpty(user.avatar_url)
            ? user.avatar_url
            : "https://placehold.co/200x200";

    useEffect(() => {
        dispatch(fetchCurrentUser());
        dispatch(fetchOrders());
    }, [dispatch]);

    if (!user.isAuthenticated) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <h1 className="text-xl font-semibold text-gray-700">
                        Log in to view all your details 🙂
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="block md:flex md:flex-col lg:flex-row items-start justify-center gap-6 lg:gap-10 mt-10 px-4 lg:px-0">
            <div className="block md:flex md:flex-row lg:flex-col items-center lg:items-start bg-white rounded-2xl shadow-md p-6 w-full lg:w-64">
                <UserAvatarModal
                    isOpen={isAvatarModalOpen}
                    onClose={() => setAvatarModalOpen(false)}
                    currentAvatar={avatarUrl()}
                    onUpdate={() => dispatch(fetchCurrentUser())}
                />
                <img
                    src={avatarUrl() || ""}
                    alt="Avatar"
                    className="rounded-full mb-5 w-32 h-32 lg:w-40 lg:h-40 object-cover border-4 border-gray-200 shadow cursor-pointer hover:opacity-90 transition"
                    onClick={() => setAvatarModalOpen(true)}
                />

                <div className="block md:flex md:flex-row lg:flex-col gap-2 w-full">
                    {["Profile", "Orders", "Password"].map((tab) => (
                        <div
                            key={tab}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full cursor-pointer ${
                                page === tab
                                    ? "bg-blue-100 text-blue-700 font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setPage(tab as typeof page)}
                        >
                            <img
                                src={
                                    tab === "Profile"
                                        ? assets.profile_icon
                                        : tab === "Orders"
                                            ? assets.cart_icon
                                            : assets.search_icon
                                }
                                className="w-5 h-5"
                            />
                            <p>{tab}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-start bg-white rounded-2xl shadow-md p-6 lg:p-8 w-full lg:w-[50%] mt-6 lg:mt-0">
                {page === "Profile" && <UserInfo />}

                {page === "Orders" && (
                    <div className="w-full py-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Your Orders
                        </h2>
                        {orders.length === 0 ? (
                            <p className="text-gray-500 text-center">You have no orders yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {orders.map((order) => (
                                    <OrdersInfo key={order.id} order={order} />
                                ))}
                            </div>
                        )}
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
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-full lg:w-auto">
                            Change Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;
