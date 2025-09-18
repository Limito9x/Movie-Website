import { User } from "../models";
import { RequestHandler } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login: RequestHandler = async (req, res) => {
  try {
    const { loginName, password } = req.body;
    const user = await User.findOne({
      where: { [Op.or]: { username: loginName, email: loginName } },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }
    const token = jwt.sign({ id: user.id, name: user.fullName }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `An error occurred during login`,
      error,
    });
  }
};