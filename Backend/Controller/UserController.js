import User from "../Model/UserSchema.js";
// import User from "../models/User.js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function addUser(req, res) {
  try {
    const { username, email, password } = req.body;
    // const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export async function getUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // if (!user || !(await bcrypt.compare(password, user.password)))
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // const token = jwt.sign({ userId: user._id }, "secret123", { expiresIn: "1h" });
    const token = jwt.sign({ userId: user._id }, "secret123", { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
