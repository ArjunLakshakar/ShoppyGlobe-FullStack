import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [error, setError] = useState(null);

    // Get product form location state 
    // const location = useLocation();
    // const { product } = location.state || {};

    // Fetch product data based on ID
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                if (!res.ok) {
                    throw new Error("Product not found");
                }
                const data = await res.json();
                setProduct(data);
                setSelectedImage(data.thumbnail);
            } catch (err) {
                setError("Failed to load product details.");
            }
        };
        fetchProduct();
    }, [id]);


    if (error) {
        return <div className="text-center py-20 text-red-600 text-xl min-h-screen bg-pink-100 italic">{error}</div>;
    }

    if (!product) {
        return <div className="text-center py-20 text-xl min-h-screen bg-pink-100 italic">No product data available.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 to-pink-100 p-4 sm:p-6">
            <button
                onClick={() => navigate(-1)}
                className="text-sm sm:text-base bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded mb-4"
            >
                ← Back
            </button>

            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-4 sm:p-6 space-y-6">
                {/* Title and Brand */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.title}</h1>
                    <p className="text-gray-500 text-sm sm:text-base">by {product.brand}</p>
                </div>

                {/* Image Gallery + Info */}
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-1/2 space-y-4">
                        <img
                            src={selectedImage}
                            alt={product.title}
                            className="w-full h-64 sm:h-80 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                        />
                        <div className="flex flex-wrap gap-2">
                            {product.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt="product"
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border cursor-pointer"
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="w-full lg:w-1/2 space-y-4">
                        <p className="text-gray-700 text-sm sm:text-base">{product.description}</p>

                        <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
                            <span className="text-pink-600">${product.price}</span>
                            <span className="text-sm text-green-600">
                                {product.discountPercentage}% off
                            </span>
                        </div>

                        <p className="text-yellow-500 text-sm">
                            {"⭐".repeat(Math.round(product.rating))} ({product.rating})
                        </p>

                        <div className="text-sm sm:text-base space-y-1">
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Availability:</strong> {product.availabilityStatus}</p>
                            <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                            <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                            <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 bg-gray-200 rounded text-xs sm:text-sm text-gray-700"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="text-sm sm:text-base mt-2">
                            <p>
                                <strong>Dimensions (W×H×D):</strong> {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                            </p>
                        </div>

                        <button
                            onClick={() => dispatch(addItemToCart(product))}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-all"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Reviews */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">Customer Reviews</h2>
                    <div className="space-y-4">
                        {product.reviews.map((review, i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-lg border">
                                <p className="text-yellow-500 text-sm mb-1">
                                    {"⭐".repeat(review.rating)} ({review.rating})
                                </p>
                                <p className="text-gray-700 italic text-sm">"{review.comment}"</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    — {review.reviewerName} ({review.reviewerEmail})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;
