import { json } from "express";
import mongoose from "mongoose";
import Cart from "../Model/CartSchema.js";
import Product from "../Model/ProductSchema.js";

export const addToCart = async (req, res) => {
  const userId = req.user?.userId;
  const { productId, quantity } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User ID missing" });
  }

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity required" });
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    // Update product to reflect it was added to cart
    // await Product.updateOne(
    //   { _id: new mongoose.Types.ObjectId(productId) },
    //   { $set: { addedToCart: true } }
    // );

    // const updateResult = await Product.updateOne(
    //   { _id: productId },
    //   // { $set: { addedToCart: true } }
    // );

    // const updatedProduct = await Product.findById(productId);
    // console.log("Updated product:", updatedProduct);

    // console.log("Product update result:", updateResult); // Log the update response

    // if (updateResult.matchedCount === 0) {
    //   console.warn(`Product ${productId} not matched for update`);
    // }

    res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Add to cart failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// export const addToCart = async (req, res) => {
//   const userId = req.user?.userId;
//   const { productId, quantity } = req.body;

//   if (!userId) {
//     return res.status(401).json({ message: "Unauthorized: User ID missing" });
//   }

//   if (!productId || !quantity) {
//     return res.status(400).json({ message: "Product ID and quantity required" });
//   }

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const existingItem = cart.items.find(item => item.productId.equals(productId));

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }

//     await cart.save();

//     await Product.updateOne(
//       { _id: productId },
//       { $set: { addedToCart: true } }
//     );

//     console.log(productId)

//     res.status(200).json({ message: "Item added to cart" });
//   } catch (err) {
//     console.error("Add to cart failed:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };



export async function updateCart(req, res) {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = req.user?.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(i => i.productId.equals(productId));
    if (!item) return res.status(404).json({ error: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// export async function removeFromCart(req, res) {
//   try {
//     const { productId } = req.params;
//     const userId = req.user?.userId;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     // Filter out the item by ObjectId comparison
//     cart.items = cart.items.filter(i => !i.productId.equals(productId));

//     await cart.save();
//     res.json({ message: "Item removed successfully", cart });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user?.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(i => !i.productId.equals(productId));

    await cart.save();

    // Optional: update Product's addedToCart to false
    await Product.findByIdAndUpdate(productId, { addedToCart: false });

    res.json({ message: "Item removed successfully", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}





// getMany
export async function getCartItems(req, res) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "No items in cart" });
    }

    res.status(200).json(cart.items);
  } catch (err) {
    console.error("Get cart items failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}



export async function clearCart(req, res) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401), json({ message: "Unauthorized: User ID missing" });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error("Clear cart failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
