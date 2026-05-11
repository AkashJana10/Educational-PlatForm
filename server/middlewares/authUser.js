import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is not present" });

    const payload = jwt.verify(token, process.env.Jwt_Sec);
    const userId  = payload._id;
    if (!userId)
      return res.status(404).json({ success: false, message: "Invalid token" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User does'n exist" });
    req.user = user;
    next();
  } catch (error) {
    console.error("authUser error:", error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
};
export default authUser;
