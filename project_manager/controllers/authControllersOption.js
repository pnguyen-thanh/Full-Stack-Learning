import bcrypt from "bcrypt";
import User from "../models/User.js";

export async function register(req, res) {
  let { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email or username already in use"
      });
    }

    // hash password EXPLICITLY
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "User registered",
      userId: user._id
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Registration failed" });
  }
}


export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // explicit compare
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // session example
    req.session.userId = user._id;

    return res.json({ message: "Logged in" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
}


export function logout(req, res) {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
}
