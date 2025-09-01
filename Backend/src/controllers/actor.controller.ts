import BaseController from "./baseController";
import { Actor } from "../models";
import { ExpressHandler } from "./baseController";
import { cloudinaryDelete } from "../utils/file";

class ActorController extends BaseController {
  constructor() {
    super(Actor, []);
  }

  update: ExpressHandler = async (req, res) => {
    try {
      const { delImages, ...actorData } = req.body;
      if (delImages && delImages.length > 0) cloudinaryDelete(delImages[0]);
      const [updatedRows] = await Actor.update(actorData, {
        where: { id: req.params.id },
      });

      if (updatedRows > 0) {
        const updatedItem = await Actor.findByPk(req.params.id);
        res.status(200).json({
          message: `Actor updated successfully!`,
          data: updatedItem,
        });
        return;
      }
      res.status(404).json({ message: `actor not found!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `An error occurred while updating actor`,
        error,
      });
    }
  };
}

export default new ActorController();
