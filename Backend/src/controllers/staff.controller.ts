import BaseController from "./baseController";
import { User, StaffInfo } from "../models";
import { ExpressHandler } from "./baseController";
import { cloudinaryDelete } from "../utils/file";
import { syncRelationship } from "../utils/relationship";

function getLastWordUnaccented(fullName: string) {
  if (!fullName) {
    return "";
  }

  // 1. Lấy từ cuối cùng
  const words = fullName.trim().split(" ");
  const lastWord = words[words.length - 1].toLowerCase();

  // 2. Chuyển đổi thành không dấu
  const unaccentedWord = lastWord
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

  return unaccentedWord;
}

async function generateStaffID() {
  const staffCount = await User.count({ where: { role: "staff" } });
  const nextId = staffCount + 1;
  return `S${nextId.toString().padStart(2, "0")}`;
}

class StaffController extends BaseController {
  constructor() {
    super(User, []);
  }

  create: ExpressHandler = async (req, res) => {
    try {
      const { phone, address, ...userData } = req.body;
      const newStaff = new User({ ...userData, role: "staff" });
      const fullName = userData.fullName || "";
      const lastWord = getLastWordUnaccented(fullName);
      const staffID = await generateStaffID();
      const username = `${lastWord}${staffID}`;
      newStaff.username = username;
      await newStaff.save();
      const newStaffInfo = await StaffInfo.create({
        userId: newStaff.id,
        staffID,
        phone,
        address,
      });

      res.status(201).json({
        message: `Staff created successfully!`,
        data: { newStaff, newStaffInfo },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while creating staff`,
        error,
      });
    }
  };

  update: ExpressHandler = async (req, res) => {
    try {
      const { delImages, ...userData } = req.body;
      if (delImages && delImages.length > 0) cloudinaryDelete(delImages[0]);
      const [updatedRows] = await User.update(userData, {
        where: { id: req.params.id },
      });

      if (updatedRows > 0) {
        const updatedItem = await User.findByPk(req.params.id);
        res.status(200).json({
          message: `User updated successfully!`,
          data: updatedItem,
        });
        return;
      }
      res.status(404).json({ message: `User not found!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while updating user`,
        error,
      });
    }
  };
}

export default new StaffController();
