import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clearToken, isTokenValid } from './hooks/auth';
import { errorNotification } from './hooks/NotificationService';

const ProductItem = ({ product, onAddToCart }) => {

    return (
        <div>
            <div className="bg-purple-100 p-4 rounded-lg shadow hover:shadow-xl">
                <Link to={`/productDetails/${product._id}`} state={{ product }}>
                    <img src={product.thumbnail} alt={product.title} className="w-full h-60 rounded mb-3 transition-transform duration-500 hover:scale-105" />
                    <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    <p className="text-pink-600 font-bold mt-2">${product.price}</p>
                </Link>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <p className="text-yellow-500">{"⭐".repeat(Math.round(product.rating))}</p>
                    </div>

                    <button
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="inline-flex items-center gap-2 hover:text-purple-600  text-purple-800 rounded-3xl px-3 py-2 transition duration-200"
                    >
                        View Item
                        <span className="text-xl ">→</span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductItem;
