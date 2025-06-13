import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { errorNotification, successNotification } from './hooks/NotificationService';

function CartItem({ item, updateLocalQuantity, removeItemLocally }) {
    async function updateQuantity(id, newQuantity) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`https://shoppyglobe-fullstack.onrender.com/updateQuantity/${id}`, { quantity: newQuantity }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            updateLocalQuantity(id, newQuantity);
        } catch (err) {
            console.error("Error updating quantity:", err);
            alert("Failed to update quantity");
        }
    }

    async function handleRemoveItem(id) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://shoppyglobe-fullstack.onrender.com/removeCartItem/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            removeItemLocally(id);
            // On removing a single item
            successNotification("Item Removed", "The item has been removed from your cart.");

        } catch (err) {
            console.error("Error removing item:", err);
            // alert("Failed to remove item");
            errorNotification("Remove Failed", "We couldn’t remove the item. Please try again.");

        }
    }

    return (
        <div className="flex-col flex xs:flex-row items-center gap-6 bg-white shadow p-4 rounded">
            <img src={item.productId.thumbnail} className="w-24 h-24 object-cover rounded" alt={item.title} />
            <div className="flex-1">
                <h2 className="text-lg font-bold">{item.productId.title}</h2>
                <p className="text-gray-600 line-clamp-2">{item.productId.description}</p>
                <p className="text-green-600 font-semibold">${item.productId.price}</p>

                <div className="flex items-center justify-between mt-2 gap-2">
                    <div>
                        <button
                            onClick={() => {
                                if (item.quantity < item.productId.stock) {
                                    updateQuantity(item.productId._id, item.quantity + 1)
                                } else {
                                    errorNotification("Limit Reached", "You've reached the maximum available stock for this item.");
                                }
                            }}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-green-400"
                        >
                            +
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                            onClick={() => {
                                if (item.quantity > 1) {
                                    updateQuantity(item.productId._id, item.quantity - 1);
                                }
                            }}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-red-400"
                        >
                            -
                        </button>
                    </div>
                    <button
                        onClick={() => handleRemoveItem(item.productId._id)}
                        className="bg-red-500 text-white xs:p-2 p-1 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
