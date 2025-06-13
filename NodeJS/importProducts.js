import mongoose from "mongoose";
import Product from "./Model/Product.js";
import fetch from "node-fetch";

import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => console.error("MongoDB connection error:", err));

// Fetch and insert products
const importProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const json = await response.json();
    const products = json.products;

    // Enrich and filter out groceries
    const enriched = products
      .filter(p => p.category.toLowerCase() !== "groceries")
      .map(p => ({
        ...p,
        availabilityStatus: "In Stock",
        shippingInformation: "Delivered within 5-7 business days",
        returnPolicy: "10-day return policy",
        warrantyInformation: "1 year manufacturer warranty",
        stock: 35, // you requested to add stock as well
        // boolean value for addedToCart
        addedToCart: false,
        tags: ["hot", "trending", "bestseller"],
        dimensions: {
          width: 20 + Math.floor(Math.random() * 10),
          height: 10 + Math.floor(Math.random() * 5),
          depth: 5 + Math.floor(Math.random() * 3)
        },
        reviews: [
          {
            reviewerName: "Alice Johnson",
            reviewerEmail: "alice@example.com",
            rating: 5,
            comment: "Excellent product!"
          },
          {
            reviewerName: "Bob Smith",
            reviewerEmail: "bob@example.com",
            rating: 4,
            comment: "Very useful and good quality."
          }
        ]
      }));

    await Product.deleteMany(); // Optional: clear old data
    await Product.insertMany(enriched);
    console.log("Products imported successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error importing products:", err);
  }
};

importProducts();
