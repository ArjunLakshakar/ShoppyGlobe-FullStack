import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
import Banner from './Banner';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cartItems.length === 0 && !paymentDone) {
        return (
            <div className='bg-gradient-to-r from-purple-200 to-pink-100 p-2 '>
                <div className="p-6 max-w-6xl mx-auto min-h-[90vh] bg-gray-100 flex flex-col">
                    <h1 className="text-3xl sm:text-4xl  font-serif   font-bold mb-6">SHOPPING CART </h1>
                    <Banner />
                    <div className="text-gray-500 m-auto">Cart is empty.</div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-gradient-to-r from-purple-200 to-pink-100 p-2 '>
            <div className="p-4 sm:p-6 max-w-6xl mx-auto min-h-screen bg-gray-100 rounded-lg">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center font-serif   sm:text-left">SHOPPING CART</h1>

                {/* Promo Banner */}
                <Banner />

                {!paymentDone && (
                    <>
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
                            <button
                                onClick={() => dispatch(clearCart())}
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
                                <CartItem key={item.id} item={item} />
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
