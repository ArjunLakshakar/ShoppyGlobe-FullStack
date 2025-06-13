import React, { useEffect, useRef, useState } from 'react';
import Banner from './Banner';
import axios from 'axios';
import { errorNotification, successNotification } from './hooks/NotificationService';
import { useNavigate } from 'react-router-dom';
import { clearToken, isTokenValid } from './hooks/auth';
import { useAuthCheck } from './hooks/authCheck';

const OrderPage = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const sessionNotified = useRef(false);
    const { checkAuth } = useAuthCheck();

    useEffect(() => {
        getItems();
    }, []);

    async function getItems() {
        try {
            const token = localStorage.getItem('token');
            if (!checkAuth()) {
                navigate('/login');
                return;
            }
            const response = await axios.get("http://localhost:3000/getOders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const item = response.data;
            console.log(item);
            setItems(item.order); // ✅ only the array
        } catch (err) {
            console.log("Error fetching order items:", err.message);
            setItems([]); // fallback
        }
    }

    async function clearItems() {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.delete("http://localhost:3000/clearHistory", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            successNotification("Order History Cleared", "All items have been removed from your orders.");

            console.log(response.data);
            setItems([]); // ✅ clear UI after delete
        } catch (err) {
            errorNotification("Clear order History Failed", "Something went wrong while clearing your orders.");
            console.log("Clear orders Failed:", err.message);
        }
    }

    return (
        <div className='min-h-screen'>
            {
                items.length === 0 ? (
                    <div className='bg-gradient-to-r from-purple-200 to-pink-100 p-2 '>
                        <div className='max-w-6xl bg-gray-100 mx-auto min-h-screen mt-6 flex flex-col p-4'>
                            <h1 className="xs:text-4xl text-2xl font-serif font-semibold text-center my-6 bg-gradient-to-r from-blue-700 via-green-600 to-purple-600 bg-clip-text text-transparent">
                                ORDERS HISTORY
                            </h1>
                            <Banner />
                            <div className='text-center my-auto text-gray-500 text-xl'>No orders found.</div>
                        </div>
                    </div>
                ) : (
                    <div className='bg-gradient-to-r from-purple-200 to-pink-100 p-2 '>
                        <div className='max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen rounded-lg shadow-lg'>
                            <div className='xs:flex-row flex flex-col max-w-5xl mx-auto justify-between items-center mb-2'>
                                <h1 className="xs:text-4xl text-2xl font-serif font-semibold text-center my-6 bg-gradient-to-r from-blue-700 via-green-600 to-purple-600 bg-clip-text text-transparent">
                                    ORDERS HISTORY
                                </h1>

                                <button
                                    className='py-1 px-2 xs:h-10 h-8 border rounded-lg text-white bg-red-500'
                                    onClick={clearItems}
                                >
                                    Clear Orders
                                </button>
                            </div>
                            <Banner />

                            {items.map((item, index) => (
                                <div key={index} className='bg-white rounded-xl py-4 xsm:flex-row flex flex-col items-center xsm:gap-10 gap-4 m-4 shadow-md p-4 hover:scale-105 transition-transform duration-300'>
                                    <div>
                                        <img src={item.productId.thumbnail} alt={item.title} className='w-24 h-24 object-cover rounded' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-semibold'>{item.productId.title}</h2>
                                        <p className='text-gray-600'>Price: ${item.productId.price}</p>
                                        <p className='text-gray-500'>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className='xsm:ml-auto flex flex-col items-center gap-3'>
                                        <button className='bg-green-500 text-white px-4 py-2 rounded'>Ordered Successfully</button>
                                        <p className='text-gray-400 text-sm'>Date: {new Date(item.date).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default OrderPage;
