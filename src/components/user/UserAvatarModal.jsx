import React, { useState } from "react";
import axios from "axios";

const UserAvatarModal = ({ isOpen, onClose, currentAvatar, onUpdate }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(currentAvatar || null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("avatar", file);

        const token = localStorage.getItem("auth_token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.patch(
                "http://localhost:3000/api/users/update_avatar",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onUpdate(response.data.avatar_url);
            onClose();
        } catch (err) {
            console.error(err.response?.data || err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md flex flex-col items-center gap-5 relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Update Avatar</h2>
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
                    <img
                        src={preview || "https://placehold.co/128x128?text=No+Avatar"}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                    />
                </div>
                <label className="cursor-pointer w-full text-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4
                       file:rounded-md file:border-0 file:text-sm file:font-semibold
                       file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                </label>
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium shadow-md
                     hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
};

export default UserAvatarModal;
