import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

const UserInfo: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    if (!user.isAuthenticated) return null;

    return (
        <div className="w-full">
            <h1 className="mb-5 text-2xl font-semibold text-gray-800">
                Welcome, {user.firstName}
            </h1>

            <label className="block text-sm font-medium text-gray-600 mb-1">
                First Name
            </label>
            <input
                type="text"
                value={user.firstName || ""}
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                readOnly
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Name
            </label>
            <input
                type="text"
                value={user.lastName || ""}
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                readOnly
            />

            <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
            </label>
            <input
                type="email"
                value={user.email || ""}
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                readOnly
            />

            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-full lg:w-auto">
                Update Account
            </button>
        </div>
    );
};

export default UserInfo;
