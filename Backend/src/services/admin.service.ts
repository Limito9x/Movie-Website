import { User, StaffInfo } from "../models";
import dotenv from "dotenv";
dotenv.config();

async function createAdmin() {
  const existingAdmin = await User.findOne({ where: { role: "admin" } });
  if (existingAdmin) {
    throw new Error("Admin user already exists");
  }

  const newAdmin = await User.create({
    username: process.env.ADMIN_USERNAME || "admin",
    fullName: process.env.ADMIN_FULLNAME || "Administrator",
    password: process.env.ADMIN_PASSWORD || "admin123",
    dateOfBirth: process.env.ADMIN_DOB
      ? new Date(process.env.ADMIN_DOB)
      : new Date("2000-01-01"),
    sex: Boolean(process.env.ADMIN_GENDER) || false,
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    role: "admin",
  });
  const adminInfo = await StaffInfo.create({
    userId: newAdmin.id,
    staffID: "S00",
    phone: process.env.ADMIN_PHONE || "0123456789",
    address: process.env.ADMIN_ADDRESS || "Admin Address",
  });
}

export { createAdmin };