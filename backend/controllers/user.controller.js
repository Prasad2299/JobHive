const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");
const { cloudinary } = require("../utils/cloudinary");

const register = async (req, res) => {
  try {
    const { fullName, email, password, role, phoneNumber } = req.body;
    console.log(fullName, email, password, role, phoneNumber);
    if (!fullName || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User with given emailId is already exist!",
        success: false,
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await User.create({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    if (response) {
      return res.status(201).json({
        message: "User register successfully!",
        success: true,
        response,
      });
    }
  } catch (error) {
    console.log("error in registration", error);
    return res.status(500).json({
      message: "Unable to register user!",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password!",
        success: false,
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect email or password!",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role!",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log("tokein in login", token);
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully!",
      success: true,
    });
  } catch (error) {
    console.log("error in logout", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    console.log(fullName, email, phoneNumber, bio, skills);
    // if (!fullName || !email || !phoneNumber || !bio || !skills) {
    //   return res.status(400).json({
    //     message: "Something is missing!",
    //     success: false,
    //   });
    // }
    //cloudinary implementation here
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // middleware authentication
    const user = await User.findById({ _id: userId });
    console.log("user before update", user);
    if (!user) {
      return res.status(400).json({
        message: "User is not found!",
        success: false,
      });
    }
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //resume implementation here

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save cloudinary url
      user.profile.resumeOriginalName = file.originalname; // save the originame file name
    }

    const newUser = await user.save();
    console.log("user after update", newUser);

    return res.status(200).json({
      message: "User updated successfully!",
      user,
      success: true,
    });
  } catch (error) {
    console.log("error in updating profile", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};
module.exports = { register, login, logout, updateProfile };
