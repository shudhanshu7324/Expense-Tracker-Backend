// signin -> user puts their crednetials -> look for existing user -> if user exists -> tell them email already taken -> if not -> create user -> create a new User in mongodb -> send back a jwt token
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password, email, mobile } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "Email already taken" });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        mobile,
      });
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "48h",
      });
      return res
        .status(200)
        .json({ message: "User created successfully", token, id: newUser._id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "Login successful", token, id: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
