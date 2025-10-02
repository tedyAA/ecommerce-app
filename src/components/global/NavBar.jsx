import React, { useContext, useEffect, useState } from 'react';
import { assets } from "../../assets/assets.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext.jsx";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/slices/cartSlice";

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch } = useContext(ShopContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        navigate("/login");
    };

    const cartCount = useSelector(selectCartCount);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to={`/`} >
                <div className="flex items-center justify-center">
                    <p className="text-2xl font-bold text-gray-800 tracking-tight hover:text-[#b14512] transition-colors">
                        Trendy
                    </p>
                    <img src={assets.success} alt="logo" className="w-[50px] h-[50px]"/>
                </div>
            </Link>
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to='/collection' className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to='/about' className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to='/contact' className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img src={assets.search_icon} onClick={() => setShowSearch(true)} className='w-5 cursor-pointer' />
                <div className='group relative'>
                    <Link to={isLoggedIn ? '/account' : '/login'}>
                        <img src={assets.profile_icon} className='w-5 cursor-pointer' />
                    </Link>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <Link to={isLoggedIn ? '/account' : '/login'}>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                            </Link>
                            {isLoggedIn && (
                                <p
                                    className='cursor-pointer hover:text-black'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative cursor-pointer'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' />
            </div>

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
