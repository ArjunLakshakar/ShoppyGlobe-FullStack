import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewerName: String,
  reviewerEmail: String,
  rating: Number,
  comment: String,
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  brand: String,
  description: String,
  price: Number,
  rating: Number,
  discountPercentage: Number,
  category: String,
  thumbnail: String,
  images: [String],

  // New fields
  availabilityStatus: String,
  shippingInformation: String,
  returnPolicy: String,
  warrantyInformation: String,
  tags: [String],
  dimensions: {
    width: Number,
    height: Number,
    depth: Number
  },
  addedToCart: { type: Boolean, default: false }, // ✅ NEW FIELD
  stock: Number,  // ✅ NEW FIELD
  reviews: [reviewSchema]
});

const Product = mongoose.model("Product", productSchema);

export default Product;
