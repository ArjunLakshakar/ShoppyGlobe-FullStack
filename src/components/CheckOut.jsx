import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrderToHistory, clearCart } from '../redux/cartSlice';
import axios from 'axios';
import CartItem from './CartItem';
import { errorNotification } from './hooks/NotificationService';

const CheckOut = ({
    setCartItems,
    cartItems,
    setShowModal,
    paymentDone,
    setPaymentDone,
    subtotal,
}) => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('');
    const tax = +(subtotal * 0.08).toFixed(2);
    const deliveryFee = subtotal >= 100 ? 0 : 10;
    const discount = paymentMethod !== 'cod' ? +(subtotal * 0.3).toFixed(2) : 0;
    const finalTotal = (subtotal + tax + deliveryFee - discount).toFixed(2);

    // function paymentHandler() {
    //     setPaymentDone(true);
    //     cartItems.map((item) => dispatch(addOrderToHistory(item)));
    //     dispatch(clearCart());
    // }

    async function paymentHandler() {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'http://localhost:3000/addToHistory',
                { items: cartItems }, // ✅ Fix: wrap it properly
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setPaymentDone(true);
            setCartItems([]);
        } catch (error) {
            console.error('Error placing order:', error.response?.data || error.message);
            errorNotification("Stock Unavailable", `${error.response?.data?.message}. Please check back later.`);
        }
    }



    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center px-4 z-50">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-md text-center relative">
                {!paymentDone ? (
                    // Payment Form
                    <>
                        <h2 className="text-xl sm:text-2xl font-bold mb-3">Payment Summary</h2>

                        <div className="flex flex-col gap-1 mb-2 max-h-40 overflow-y-auto text-sm sm:text-base">
                            <div className="flex justify-between font-medium text-gray-800 border-b pb-1">
                                <p>Product</p>
                                <p>Qty</p>
                            </div>
                            {cartItems.map((item, i) => (
                                <div key={i} className="flex justify-between text-gray-600">
                                    <p>{item.productId.title}</p>
                                    <p>{item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-left text-sm sm:text-base space-y-2 text-gray-700 border-t my-3">
                            <p>Subtotal: <span className="float-right">${subtotal.toFixed(2)}</span></p>
                            <p>Tax (8%): <span className="float-right">${tax}</span></p>
                            <p>Delivery: <span className="float-right">{deliveryFee ? `$${deliveryFee}` : "Free"}</span></p>
                            {paymentMethod !== "cod" && (
                                <p className="text-green-600 font-medium">
                                    Discount: <span className="float-right">-${discount}</span>
                                </p>
                            )}
                            <hr />
                            <p className="font-bold text-base sm:text-lg">Total: <span className="float-right">${finalTotal}</span></p>
                        </div>

                        <div className="mb-4">
                            <p className="font-medium text-left mb-1">Payment Method:</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {["upi", "card", "cod"].map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setPaymentMethod(method)}
                                        className={`px-3 py-1 rounded border ${paymentMethod === method ? "bg-green-200" : ""}`}
                                    >
                                        {method.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={paymentHandler}
                            className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2"
                            disabled={!paymentMethod}
                        >
                            {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
                        </button>

                        <button
                            onClick={() => setShowModal(false)}
                            className="text-sm text-gray-500 mt-3 underline w-full"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    // Payment Success Message  
                    <>
                        <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
                        <p className="text-gray-700 text-sm sm:text-base mb-2">
                            Thank you for your order. Your items will be delivered soon 🚚.
                        </p>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setPaymentDone(false);
                                setPaymentMethod('');
                            }}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </>
                )}
            </div>
        </div>

    );
};

export default CheckOut;
