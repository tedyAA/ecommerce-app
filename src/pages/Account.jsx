import React, { useEffect, useState } from 'react';
import auth from '../api/users/auth.js'; // adjust path

const Account = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const data = await auth.current();
            setUser(data);
        };

        getUser();
    }, []);

    if (!user) return <p>Loading or not logged in...</p>;

    return (
        <div>
            <h1>Welcome, {user.first_name}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Account;
