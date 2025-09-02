import React, { useEffect, useState } from 'react';
import auth from '../api/users/auth.js';
import { assets } from "../assets/assets.js";
import UserAvatarModal from "../components/user/UserAvatarModal.jsx";
import {isEmpty} from "lodash"; // make sure path is correct

const Account = () => {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('Profile');
    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

    const updateUser = async () => {
        try {
            const data = await auth.current();
            setUser(data);
        } catch (error) {
            console.error("Failed to fetch user", error);
        }
    };

    const avatarUrl = () =>{
        console.log(user.avatar_url)
        return !isEmpty(user.avatar_url) ? user.avatar_url : 'https://placehold.co/200x200'
    }

    useEffect(() => {
        updateUser();
    }, []);

    if (!user) return <p>Loading...</p>;
    return (
        <div className='flex flex-row items-start justify-center gap-10'>
            <div className='flex flex-col justify-start p-5 items-center border border-gray-800 p-5'>
                <UserAvatarModal
                    isOpen={isAvatarModalOpen}
                    onClose={() => setAvatarModalOpen(false)}
                    currentAvatar={avatarUrl()}
                    onUpdate={updateUser}
                />
                <img
                    src={avatarUrl()}
                    alt='Avatar'
                    className='rounded-full mb-5 w-[200px] cursor-pointer'
                    onClick={() => setAvatarModalOpen(true)}
                />
                <div className='flex cursor-pointer mb-2 items-center' onClick={() => setPage('Profile')}>
                    <img src={assets.profile_icon} className='w-5 h-5 mx-2'/>
                    <p>Profile</p>
                </div>
                <div className='flex cursor-pointer mb-2 items-center' onClick={() => setPage('Orders')}>
                    <img src={assets.cart_icon} className='w-5 h-5 mx-2'/>
                    <p>Orders</p>
                </div>
                <div className='flex cursor-pointer mb-2 items-center' onClick={() => setPage('Password')}>
                    <img src={assets.search_icon} className='w-5 h-5 mx-2'/>
                    <p>Change Password</p>
                </div>
            </div>

            <div className='flex flex-col items-center justify-start px-5 w-[50%]'>
                {page === 'Profile' && (
                    <div className='w-full'>
                        <h1 className='mb-5 text-xl'>Welcome, {user.first_name}</h1>
                        <label>First Name</label>
                        <input
                            type="text"
                            value={user.first_name}
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={user.last_name}
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            value={user.email}
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <button className="cursor-pointer border border-gray-800 py-2 px-1">
                            Update Account
                        </button>
                    </div>
                )}
                {page === 'Orders' && (
                    <div>
                        <h1>No Orders Yet</h1>
                    </div>
                )}
                {page === 'Password' && (
                    <div className='w-full'>
                        <label>Enter Old Password</label>
                        <input
                            type="password"
                            placeholder="Old Password"
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <label>Enter New Password</label>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <button className="cursor-pointer w-fit text-center border border-gray-800 py-2 px-1">
                            Change Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;
