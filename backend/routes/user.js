import express from "express";
const router = express.Router();
import { User, Account } from "../models/user.js";
import zod from "zod";
import brypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import Authentication from "../middleware/Auth.js";

const userSchema = zod.object({
  userName: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(8),
  // .regex(/[a-z]/)
  // .regex(/[A-Z]/)
  // .regex(/\d/)
  // .regex(/[^a-zA-Z0-9]/),
});

// POST
// singup
router.post("/signup", async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;

  const { success } = userSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json({ success: false, message: "password criteria not matched" });
  }

  if (!userName || !firstName || !lastName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory" });
  }

  const exsistingUser = await User.findOne({ userName });

  if (exsistingUser) {
    return res
      .status(411)
      .json({ success: false, message: "User Name already taken." });
  } else {
    const hashedPassword = await brypt.hash(password, 5);

    const user = await User.create({
      userName,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const userID = user._id;

    await Account.create({
      userID,
      balance: Math.round(1 + Math.random() * 10000),
    });
    console.log("User signedUp successfully.");
    return res
      .status(200)
      .json({ success: true, message: "User signedUp successfully." });
  }
});

// POST
// singin
router.post("/signin", async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  if (!user) {
    console.log("User not found");
    return res
      .status(404)
      .json({
        message: "User not found, please make sure to create an account.",
      });
  }

  if (user && (await brypt.compare(password, user.password))) {
    const tokenPayload = {
      userID: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET);

    return res
      .status(200)
      .json({ success: true, message: "Sign in successfull.", token: token });
  } else {
    return res
      .status(200)
      .json({ success: false, message: "Invalid Credentials." });
  }
});

// GET
// allUsers
router.get("/allUsers", Authentication, async (req, res) => {
  const Filter = req.query.Filter || "";

  try {
    // const allUsers = await User.find({_id : { $ne : req.userID}});
    const regex = new RegExp(Filter, "i");
    const allUsers = await User.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } }
      ]
    });


    if (allUsers) {
      return res.status(200).json({ success: true, allUsers : allUsers.map((user) => ({userName : user.userName, firstName : user.firstName, lastName : user.lastName, _id : user._id})) });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Server error | Failed to fetch all users list!",
        });
    }
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Server error | Failed to fetch all users list!",
      });
  }
});
export default router;
