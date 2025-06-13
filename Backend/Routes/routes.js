import { addUser, getUser } from "../Controller/UserController.js";
import { getProduct, getSingleProduct } from "../Controller/ProductController.js";
import { addToCart, updateCart, removeFromCart, getCartItems, clearCart } from "../Controller/CartController.js";
import { addOrderHistory, clearHistory,getOrders } from "../Controller/OrderHistory.js";
import { auth } from "./auth.js";
// import { auth } from "./auth.js"
import express from "express";
// import { get } from "mongoose";

export function routes(app) {

  const router = express.Router();
  // User
  app.post("/register", addUser);
  app.post("/login", getUser);

  // Products
  app.get("/products", getProduct);
  app.get("/products/:id", getSingleProduct);

  // Cart (protected)
  app.post("/cart", auth, addToCart);
  app.get("/getCartItems", auth, getCartItems);
  app.put("/updateQuantity/:productId", auth, updateCart);
  app.delete("/removeCartItem/:productId", auth, removeFromCart);
  app.delete('/clearCart', auth, clearCart);

  // OrderHistory
  app.post('/addToHistory', auth, addOrderHistory)
  app.get('/getOders',auth, getOrders);
  app.delete('/clearHistory', auth, clearHistory )
}
