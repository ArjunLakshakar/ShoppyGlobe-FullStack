import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
// const storedQuantity = JSON.parse(localStorage.getItem("totalQuantity")) || 0;
const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: storedItems,
    // totalQuantity: storedQuantity,
    orders: storedOrders,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      // state.totalQuantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      // localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        // state.totalQuantity -= item.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      // localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
    },

    clearCart(state) {
      state.items = [];
      // state.totalQuantity = 0;
      localStorage.removeItem("cartItems");
      // localStorage.removeItem("totalQuantity");
    },

    decreaseItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        // state.totalQuantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      // localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
    },

    addOrderToHistory(state, action) {
      const newOrder = action.payload;
      const orderWithDate = { ...newOrder, date: new Date().toLocaleString() };

      state.orders.push(orderWithDate);
      localStorage.setItem("orderHistory", JSON.stringify(state.orders));
    },

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
