import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, addItemToCart, decreaseItemQuantity } from '../redux/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';


function CartItem ({ item }) {
    const dispatch = useDispatch();

    return (
        <div className="flex-col flex xs:flex-row items-center gap-6 bg-white shadow p-4 rounded">
            <img src={item.thumbnail} className="w-24 h-24 object-cover rounded" alt={item.title} />
            <div className="flex-1">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-gray-600 line-clamp-2">{item.description}</p>
                <p className="text-green-600 font-semibold">${item.price}</p>

                <div className="flex items-center justify-between mt-2 gap-2">
                    <div>
                        <button
                            onClick={() => dispatch(addItemToCart(item))}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-green-400"
                        >
                            +
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                            onClick={() => dispatch(decreaseItemQuantity(item.id))}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-red-400"
                        >
                            -
                        </button>
                    </div>
                    <button
                        onClick={() => dispatch(removeItemFromCart(item.id))}
                        className="bg-red-500 text-white xs:p-2 p-1 rounded-lg hover:bg-red-500 transition-colors duration-300 "
                    >
                        {/* Remove */}
                        <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                    </button>
                </div>
            </div>


        </div>
    );
};

export default CartItem;
