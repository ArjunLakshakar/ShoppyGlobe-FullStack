import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="bg-purple-200 text-black py-10 px-6 border-t-gray-400 border-1 ">
            <div className="md:max-w-[85%] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="xs:text-2xl text-xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent "
                        style={{ fontFamily: 'Oleo Script, serif' }}>ShoppyGlobe</h3>
                    <p className="text-sm text-gray-600">Your one-stop shop for the latest fashion trends and accessories at unbeatable prices.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-md text-gray-600">
                        <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
                        <li><Link to="/products" className="hover:text-purple-600">Shop</Link></li>
                        <li><Link to="/cart" className="hover:text-purple-600">Cart</Link></li>
                        <li><Link to="/orderHistory" className="hover:text-purple-600">Orders</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Categories</h4>
                    <ul className="space-y-2 text-md text-gray-600">
                        <li><Link to="/products" className="hover:text-purple-600">Men’s Clothing</Link></li>
                        <li><Link to="/products" className="hover:text-purple-600">Women’s Clothing</Link></li>
                        <li><Link to="/products" className="hover:text-purple-600">Shoes</Link></li>
                        <li><Link to="/products" className="hover:text-purple-600">Accessories</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
                    <p className="text-md text-gray-600 mb-4">Sign up to get the latest updates and offers.</p>
                    <form className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-md text-black focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded-md transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center mt-10 text-md text-gray-500 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.
            </div>
        </footer>

    )
}
