import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password are required" });
        }
        const user = await User.findOne({
            where: { username },
        });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const secretKey = process.env.JWT_SECRET_KEY || "";
        if (!secretKey) {
            return res.status(500).json({ message: "Server configuration error" });
        }
        const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
        return res.json({ token });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const router = Router();
// POST /login - Login a user
router.post("/login", login);
export default router;
