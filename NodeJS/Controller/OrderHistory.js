import OrderHistory from "../Model/OrderHistorySchema.js";
import Cart from "../Model/CartSchema.js";
import Product from "../Model/ProductSchema.js";

export async function addOrderHistory(req, res) {
  try {
    const userId = req.user?.userId;
    const items = req.body.items; // Ensure body is an array

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid format: Expected an array of items" });
    }

    // Get the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Find or create order history
    let orderHistory = await OrderHistory.findOne({ userId });
    if (!orderHistory) {
      orderHistory = new OrderHistory({ userId, items: [] });
    }

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item.productId.title}` });
      }

      await Product.updateOne(
        { _id: item.productId },
        {
          $inc: { stock: -item.quantity },
        }
      );

      orderHistory.items.push({
        productId: item.productId,
        quantity: item.quantity,
        date: new Date()
      });
    }


    await orderHistory.save();

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Order placed successfully", orderHistory });
  } catch (err) {
    console.error("Add to order history failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}


// export async function addOrderHistory(req, res) {
//   try {
//     const userId = req.user?.userId;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized: User ID missing" });
//     }

//     // Get the user's cart
//     const cart = await Cart.findOne({ userId });
//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // Find or create order history
//     let orderHistory = await OrderHistory.findOne({ userId });
//     if (!orderHistory) {
//       orderHistory = new OrderHistory({ userId, items: [] });
//     }

//     // Add all cart items to order history
//     for (const item of cart.items) {

//       const product = await Product.find(item.productId);

//       if (product.stock < item.quantity) {
//         return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
//       }

//       product.stock -= item.quantity;
//       product.addedToCart = false;
//       await product.save();

//       orderHistory.items.push({
//         productId: item.productId,
//         quantity: item.quantity
//       });
//     }

//     // Save order history
//     await orderHistory.save();

//     // Clear the cart after placing order
//     cart.items = [];
//     await cart.save();



//     res.status(200).json({ message: "Order placed successfully", orderHistory });
//   } catch (err) {
//     console.error("Add to order history failed:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }

export async function clearHistory(req, res) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const order = await OrderHistory.findOne({ userId });
    if (!order || order.items.length === 0) {
      return res.status(400).json({ message: "No Order Found" });
    }

    await OrderHistory.deleteOne({ userId });

    return res.status(200).json({ message: "Order history cleared successfully" });

  } catch (err) {
    console.error("Clear order history failed:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}


export async function getOrders(req, res) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const order = await OrderHistory.findOne({ userId }).populate("items.productId");;
    if (!order || order.items.length === 0) {
      return res.status(400).json({ message: "No Order Found" });
    }

    // await OrderHistory.deleteOne({ userId });

    return res.status(200).json({ message: "Get Orders successfully", order: order.items });

  } catch (err) {
    console.error("Clear order history failed:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
