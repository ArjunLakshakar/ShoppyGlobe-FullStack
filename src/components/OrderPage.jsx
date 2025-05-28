import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearOrderHistory } from '../redux/cartSlice';
import Banner from './Banner';

const OrderPage = () => {
    const items = useSelector((state) => state.cart.orders);
    const dispatch = useDispatch();
    return (
        <div className='min-h-screen'>
            {
                items.length === 0 ? (
                    <>
                        <div className='bg-gradient-to-r from-purple-200 to-pink-100 p-2'>
                            <div className='max-w-6xl bg-gray-100 mx-auto min-h-[90vh] mt-6 flex flex-col p-4'>
                                <h1 className="xs:text-4xl text-2xl font-bold text-center my-6 bg-gradient-to-r from-blue-700 via-green-600 to-purple-600 bg-clip-text text-transparent">
                                    ORDERS HISTORY
                                </h1>
                                <Banner />
                                <div className='text-center my-auto text-gray-500  text-xl'>No orders found.</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='bg-gradient-to-r from-purple-200 to-pink-100 p-2'>
                        <div className='max-w-6xl mx-auto p-6 bg-gray-100  rounded-lg shadow-lg'>

                            <div className='xs:flex flex flex-col  max-w-5xl mx-auto justify-between items-center mb-2'>
                                <h1 className="xs:text-4xl text-2xl font-bold text-center my-6 bg-gradient-to-r from-blue-700 via-green-600 to-purple-600 bg-clip-text text-transparent">
                                    ORDERS HISTORY
                                </h1>

                                <button className='py-1 px-2 xs:h-10 h-8 border rounded-lg text-white bg-red-500'
                                    onClick={() => dispatch(clearOrderHistory())} >Clear Orders</button>
                            </div>
                            <Banner />

                            {items.map((item, index) => (
                                <div key={index} className='bg-white rounded-xl py-4 xs:flex-row flex flex-col  items-center xs:gap-10 gap-4 m-4 shadow-md p-4 hover:scale-105 transition-transform duration-300'>
                                    <div>
                                        <img src={item.thumbnail} alt={item.title} className='w-24 h-24 object-cover rounded' />
                                    </div>
                                    <div className=''>
                                        <h2 className='text-xl font-semibold'>{item.title}</h2>
                                        <p className='text-gray-600'>Price: ${item.price}</p>
                                        <p className='text-gray-500'>Quantity: {item.quantity}</p>
                                    </div>

                                    <div className='xs:ml-auto flex flex-col items-center gap-3'>
                                        <button className='bg-green-500 text-white px-4 py-2 rounded'>Order Successfully</button>
                                        <p className='text-gray-400 text-sm'>Date: {item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}


export default OrderPage
