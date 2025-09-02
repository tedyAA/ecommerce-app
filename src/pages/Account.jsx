import React, { useEffect, useState } from 'react';
import auth from '../api/users/auth.js';
import {assets} from "../assets/assets.js"; // adjust path

const Account = () => {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('Profile')

    useEffect(() => {
        const getUser = async () => {
            const data = await auth.current();
            setUser(data);
        };

        getUser();
    }, []);

    if (!user) return <p>Loading or not logged in...</p>;

    return (
        <div className='flex flex-row items-center justify-center'>
            <div className='flex flex-col justify-left p-5'>
                <img src="https://placehold.co/200x200" alt='' className='rounded-full mb-5 w-[200px]'/>
                <div className='flex cursor-pointer mb-2' onClick={() => setPage('Profile')}>
                    <img src={assets.profile_icon} className='w-5 h-5 mx-2'/>
                    <p>Profile</p>
                </div>
                <div className='flex cursor-pointer mb-2' onClick={() => setPage('Orders')}>
                    <img src={assets.cart_icon} className='w-5 h-5 mx-2'/>
                    <p>Orders</p>
                </div>
                <div className='flex cursor-pointer mb-2' onClick={() => setPage('Password')}>
                    <img src={assets.search_icon} className='w-5 h-5 mx-2'/>
                    <p>Change Password</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center px-5 w-[50%]'>
                {page === 'Profile' && (
                    <div>
                        <h1 className='mb-5'>Welcome, {user.first_name}</h1>
                        <input
                            type="text"
                            value={user.first_name}
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <input
                            type="text"
                            value={user.last_name}
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <input
                            type="text"
                            value={user.email}
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <p className="cursor-pointer border border-gray-800 py-2 px-1">
                            Update Account
                        </p>
                    </div>
                )}
                {page === 'Orders' && (
                    <div>
                        <h1>No Orders Yet</h1>
                    </div>
                )}
                {page === 'Password' && (
                    <div>
                        <input
                            type="password"
                            placeholder="Old Password"
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-3 py-2 mb-4 border border-gray-800"
                        />
                        <p className="cursor-pointer w-fit text-center border border-gray-800 py-2 px-1">
                            Update Password
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;
