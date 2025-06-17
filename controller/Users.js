import connectDb from "../utils/connectDb.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/UserModel.js";

const createUser = async (req, res) => {
  await connectDb();

  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user info + token
    res.status(201).json({
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("createUser error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  await connectDb();

  try {
    const {email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "User not found." });
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordMatch){
      return res.status(400).josn({error:"Incorrect password"});
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user info + token
    res.status(201).json({
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("createUser error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { createUser, loginUser };
