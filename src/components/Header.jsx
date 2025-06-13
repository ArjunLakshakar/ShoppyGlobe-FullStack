import {
    faCartShopping,
    faTruck,
    faBars,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { clearToken, isTokenValid } from './hooks/auth';
import axios from 'axios';
import { successNotification } from './hooks/NotificationService';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());

    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const logout = () => {
        clearToken();
        delete axios.defaults.headers.common['Authorization'];
        setIsLoggedIn(false);
        successNotification("Logout", "You have been logged out successfully.");
        navigate('/login');
    };

    useEffect(() => {
        const checkLogin = () => {
            setIsLoggedIn(isTokenValid());
        };
        checkLogin();
        const interval = setInterval(checkLogin, 1000); // optional: keep login status up to date
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="bg-gradient-to-r from-pink-300 to-purple-400 text-gray-800 p-6 shadow-lg flex items-center justify-between relative z-50">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent"
                style={{ fontFamily: 'Oleo Script, serif' }}>
                ShoppyGlobe
            </h1>

            {!isOpen && (
                <button onClick={toggleMenu} className="sm:hidden text-3xl text-gray-800 z-50">
                    <FontAwesomeIcon icon={faBars} />
                </button>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex md:space-x-14 space-x-7 md:text-2xl text-xl font-bold">
                <NavLink to="/" className={({ isActive }) => isActive ? "text-purple-700 font-bold" : "hover:text-purple-200"}>Home</NavLink>
                <NavLink to="/products" className={({ isActive }) => isActive ? "text-purple-700 font-bold" : "hover:text-purple-200"}>Products</NavLink>
                <NavLink to="/cart" className={({ isActive }) => isActive ? "text-purple-700 font-bold flex flex-col items-center" : "hover:text-purple-200 flex flex-col items-center"}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <p className='text-xs'>Cart</p>
                </NavLink>
                <NavLink to="/orderHistory" className={({ isActive }) => isActive ? "text-purple-700 font-bold flex flex-col items-center" : "hover:text-purple-200 flex flex-col items-center"}>
                    <FontAwesomeIcon icon={faTruck} />
                    <p className='text-xs'>Orders</p>
                </NavLink>
                {
                    isLoggedIn ? (
                        <button onClick={logout} className="hover:text-purple-200">Logout</button>
                    ) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-purple-700 font-bold"
                                    : "hover:text-purple-200"
                            }
                        >
                            LOGIN
                        </NavLink>
                    )
                }
            </nav>

            {/* Mobile Sidebar Navigation */}
            {isOpen && (
                <div className="fixed sm:hidden inset-0 bg-purple-100 z-40 flex flex-col items-start p-6 transition-all max-w-xs ml-auto shadow-xl">
                    <div className="flex justify-between items-center w-full mb-10 bg-gradient-to-r from-pink-300 to-purple-400 py-1 px-3 rounded-3xl">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent"
                            style={{ fontFamily: 'Oleo Script, serif' }}>
                            ShoppyGlobe
                        </h2>
                        <button onClick={closeMenu} className="text-3xl">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-6 text-xl font-semibold w-full">
                        <Link to="/" className="hover:text-purple-500" onClick={closeMenu}>Home</Link>
                        <Link to="/products" className="hover:text-purple-500" onClick={closeMenu}>Products</Link>
                        <Link to="/cart" className="hover:text-purple-500 flex items-center gap-2" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faCartShopping} /> Cart
                        </Link>
                        <Link to="/orderHistory" className="hover:text-purple-500 flex items-center gap-2" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faTruck} /> Orders
                        </Link>
                        <div>
                            {
                                isLoggedIn ? (
                                    <button
                                        onClick={() => {
                                            logout();
                                            closeMenu();
                                        }}
                                        className="hover:text-purple-500"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={closeMenu}
                                        className="hover:text-purple-500"
                                    >
                                        LOGIN
                                    </Link>
                                )
                            }
                        </div>
                        <a
                            href="https://github.com/ArjunLakshakar/ShoppyGlobe"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-purple-500 flex items-center gap-2"
                            onClick={closeMenu}
                        >
                            <FontAwesomeIcon icon={faGithub} /> GitHub
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
