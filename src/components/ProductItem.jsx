import React from 'react'
import { Link } from 'react-router-dom';

const ProductItem = ({ product, onAddToCart }) => {
    return (
        <div>
            <div key={product.id} className="bg-purple-100 p-4 rounded-lg shadow hover:shadow-xl">
                <Link to={`/productDetails/${product.id}`} state={{ product }}>
                    <img src={product.thumbnail} alt={product.title} className="w-full h-60 rounded mb-3 transition-transform duration-500 hover:scale-115 " />
                    <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>



                </Link>
                <div className='flex flex-col  xs:flex justify-between items-center'>
                    <div>
                        <p className="text-pink-600 font-bold mt-2">${product.price}</p>
                        <p className="text-yellow-500">{"⭐".repeat(Math.round(product.rating))}</p>
                    </div>

                    <button
                        onClick={() => onAddToCart(product)}
                        className="mt-2 h-8 py-1 px-3 bg-blue-600 text-white rounded hover:bg-green-500"
                    >
                        Add to Cart
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductItem;