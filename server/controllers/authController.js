import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    const token = generateToken(user._id);

    res.cookie("token", token);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if(!user){
      return res.status(400).json({msg:"User not found"});
    }

    res.json(user);
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
};

