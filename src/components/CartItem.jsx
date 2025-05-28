import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, addItemToCart, decreaseItemQuantity } from '../redux/cartSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex-col flex xs:flex-row items-center gap-6 bg-white shadow p-4 rounded">
            <img src={item.thumbnail} className="w-24 h-24 object-cover rounded" alt={item.title} />
            <div className="flex-1">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-gray-600 line-clamp-2">{item.description}</p>
                <p className="text-green-600 font-semibold">${item.price}</p>

                <div className="flex items-center mt-2 gap-2">
                    <button
                        onClick={() => dispatch(addItemToCart(item))}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-green-400"
                    >
                        +
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                        onClick={() => dispatch(decreaseItemQuantity(item.id))}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-red-400"
                    >
                        -
                    </button>
                </div>
            </div>

            <button
                onClick={() => dispatch(removeItemFromCart(item.id))}
                className="bg-red-500 text-white px-3 py-1 rounded"
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;
