//login register and logout and admin login also
import validator from "validator";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token, message: "Login successful" });
    } 
    
    else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }




  } catch (err) {
    console.log("Error in loginUser:", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const registerUser = async (req, res) => {
  // Logic for registering a user

  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      token,

      message: "User registered successfully",
    });
  } catch (err) {
    console.log("Error in registerUser:", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const adminLogin = async (req, res) => {

  try{
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({ success: true, token, message: "Admin login successful" });

    }
    else{
      return res.status(400).json({ message: "Invalid admin credentials" });
    }


  }
  catch (err) {
    console.log("Error in adminLogin:", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }



};

export { loginUser, registerUser, adminLogin };
