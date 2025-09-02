import React, { useState } from 'react';
import axios from 'axios';
import auth from "../api/users/auth.js";

axios.defaults.withCredentials = true;

const Login = () => {
    const [mode, setMode] = useState('Login');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            let response;

            if (mode === 'Login') {
                response = await auth.login(email, password);

                if (response.data.token) {
                    localStorage.setItem('auth_token', response.data.token);
                }

                console.log('Logged in:', response.data.user);
            } else {
                response = await auth.signup(firstName, lastName, email, password );

                console.log('User created:', response.data);
            }
        } catch (err) {
            console.error('Authentication failed:', err.response?.data || err);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">{mode}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>

            {mode === 'Sign up' && (
                <div>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 mb-4 border border-gray-800"
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-800"
                        placeholder="Last Name"
                        required
                    />
                </div>
            )}

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Email"
                required
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Password"
                required
            />

            <div className="w-full flex justify-between text-sm mt-[8px]">
                <p className="cursor-pointer">Forgot your password?</p>
                {mode === 'Login' ? (
                    <p onClick={() => setMode('Sign up')} className="cursor-pointer">
                        Create account
                    </p>
                ) : (
                    <p onClick={() => setMode('Login')} className="cursor-pointer">
                        Login Here
                    </p>
                )}
            </div>

            <button className="bg-black text-white font-light px-8 py-2 mt-4">
                {mode === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
        </form>
    );
};

export default Login;
