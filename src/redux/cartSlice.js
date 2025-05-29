import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: storedItems,
    orders: storedOrders,
  },
  reducers: {
    // Add item to cart
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // Remove item from cart
    removeItemFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        state.items = state.items.filter((item) => item.id !== id);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // Clear the cart
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cartItems");
    },

    // Decrease item quantity
    decreaseItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },


    // Add order to history
    addOrderToHistory(state, action) {
      const newOrder = action.payload;
      const orderWithDate = { ...newOrder, date: new Date().toLocaleString() };

      state.orders.push(orderWithDate);
      localStorage.setItem("orderHistory", JSON.stringify(state.orders));
    },

    // Clear order history
    clearOrderHistory(state, action) {
      state.orders = [];
      localStorage.removeItem('orderHistory');
    }
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  decreaseItemQuantity,
  addOrderToHistory,
  clearOrderHistory
} = cartSlice.actions;

export default cartSlice.reducer;
