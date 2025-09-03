import BaseController from "./baseController";
import { User } from "../models";
import { ExpressHandler } from "./baseController";
import { cloudinaryDelete } from "../utils/file";

class UserController extends BaseController {
  constructor() {
    super(User, []);
  }

  create: ExpressHandler = async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await User.create({...userData,role: "user"});
      res.status(201).json({
        message: `User created successfully!`,
        data: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while creating user`,
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

export default new UserController();
