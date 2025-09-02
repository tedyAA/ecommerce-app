import React, { useState } from 'react';
import axios from 'axios';

const UserAvatarModal = ({ isOpen, onClose, currentAvatar, onUpdate }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(currentAvatar || null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('avatar', file);

        const token = localStorage.getItem('auth_token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.patch(
                'http://localhost:3000/api/users/update_avatar',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-auto flex flex-col items-center gap-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold">Update Avatar</h2>
                {preview && (
                    <img
                        src={preview}
                        alt="Avatar Preview"
                        className="w-100 h-100 rounded-full object-cover"
                    />
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
};

export default UserAvatarModal;
