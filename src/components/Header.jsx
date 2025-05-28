import {
    faCartShopping,
    faTruck,
    faBars,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="bg-gradient-to-r from-pink-300 to-purple-400 text-gray-800 p-6 shadow-lg flex items-center justify-between relative z-50">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent"
                style={{ fontFamily: 'Oleo Script, serif' }}>
                ShoppyGlobe
            </h1>

            {/* Mobile menu button */}
            {
                !isOpen && <button onClick={toggleMenu} className="sm:hidden text-3xl text-gray-800 z-50">
                    <FontAwesomeIcon icon={faBars} />
                </button>
            }


            {/* Desktop Nav */}
            <nav className="hidden sm:flex md:space-x-14 space-x-7 md:text-2xl text-xl font-bold">
                <a href="/" className="hover:text-white">Home</a>
                <a href="/products" className="hover:text-white">Products</a>
                <a href="/cart" className="flex flex-col items-center hover:text-white">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <p className='text-xs'>Cart</p>
                </a>
                <a href="/orderHistory" className="flex flex-col items-center hover:text-white">
                    <FontAwesomeIcon icon={faTruck} />
                    <p className='text-xs'>Orders</p>
                </a>
                <a href="https://github.com/ArjunLakshakar" className="text-3xl hover:text-white">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-purple-100 z-40 flex flex-col items-start p-6 transition-all max-w-xs ml-auto">
                    <div className="flex justify-between items-center w-full mb-10 bg-gradient-to-r from-pink-300 to-purple-400 py-1 px-3 rounded-3xl">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent"
                            style={{ fontFamily: 'Oleo Script, serif' }}>
                            ShoppyGlobe
                        </h2>
                        <button onClick={closeMenu} className="text-3xl">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-6 text-xl font-semibold ">
                        <a href="/" className="hover:text-purple-500" onClick={closeMenu}>Home</a>
                        <a href="/products" className="hover:text-purple-500" onClick={closeMenu}>Products</a>
                        <a href="/cart" className="hover:text-purple-500 flex items-center gap-2" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faCartShopping} /> Cart
                        </a>
                        <a href="/orderHistory" className="hover:text-purple-500 flex items-center gap-2" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faTruck} /> Orders
                        </a>
                        <a href="https://github.com/ArjunLakshakar" className="hover:text-purple-500 " onClick={closeMenu}>
                            <FontAwesomeIcon icon={faGithub} /> GitHub
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
