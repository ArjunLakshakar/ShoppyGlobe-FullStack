import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
import Banner from './Banner';
import { errorNotification, successNotification } from './hooks/NotificationService';
import { clearToken, isTokenValid } from './hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from './hooks/authCheck';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    const navigate = useNavigate();
    const sessionNotified = useRef(false);
    const { checkAuth } = useAuthCheck();

    const subtotal = cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    async function fetchCartItems() {
        try {
            const token = localStorage.getItem('token');
            if (!checkAuth()) {
                // navigate('/login');
                return;
            }
            const response = await axios.get('http://localhost:3000/getCartItems', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const items = response.data.items || response.data;
            setCartItems(items);
        } catch (err) {
            console.error('Error fetching cart items:', err.message);
        }
    }

    async function handleClearCart() {
        try {
            const token = localStorage.getItem('token');
            await axios.delete('http://localhost:3000/clearCart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems([]);
            // alert('Cart cleared successfully');
            successNotification("Cart Cleared", "All items have been removed from your cart.");

        } catch (err) {
            console.error('Error clearing cart:', err.message);
            errorNotification("Clear Failed", "Something went wrong while clearing your cart.");

        }
    }

    function updateLocalQuantity(productId, newQuantity) {
        setCartItems(prev =>
            prev.map(item =>
                item.productId._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    }

    function removeItemLocally(productId) {
        setCartItems(prev =>
            prev.filter(item => item.productId._id !== productId)
        );
    }

    if (cartItems.length === 0 && !paymentDone) {
        return (
            <div className='bg-gradient-to-r from-purple-200 to-pink-100 p-2 '>
                <div className="p-6 max-w-6xl mx-auto min-h-[90vh] bg-gray-100 flex flex-col">
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-6">SHOPPING CART</h1>
                    <Banner />
                    <div className="text-gray-500 m-auto">Cart is empty.</div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-gradient-to-r from-purple-200 to-pink-100 p-2 '>
            <div className="p-4 sm:p-6 max-w-6xl mx-auto min-h-screen bg-gray-100 rounded-lg">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center sm:text-left font-serif">SHOPPING CART</h1>

                <Banner />

                {!paymentDone && (
                    <>
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
                            <button
                                onClick={handleClearCart}
                                className="bg-red-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                            >
                                Clear Cart
                            </button>
                            <p className="text-2xl sm:text-3xl font-semibold text-green-600">
                                Total: ${subtotal.toFixed(2)}
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.productId._id}
                                    item={item}
                                    updateLocalQuantity={updateLocalQuantity}
                                    removeItemLocally={removeItemLocally}
                                />
                            ))}
                        </div>

                        <div className="mt-6 sm:mt-8 text-center sm:text-right">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-green-600 text-white px-6 py-2 rounded text-sm sm:text-base"
                            >
                                Buy Now
                            </button>
                        </div>
                    </>
                )}

                {showModal && (
                    <CheckOut
                        setCartItems={setCartItems}
                        cartItems={cartItems}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        paymentDone={paymentDone}
                        setPaymentDone={setPaymentDone}
                        subtotal={subtotal}
                    />
                )}
            </div>
        </div>
    );
};

export default Cart;
