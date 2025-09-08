import staffController from "../controllers/actor.controller";
import { uploadAvatar } from "../middlewares/upload.middleware";
import { createBaseRouter } from "./baseRouter";
import { bufferUpload } from "../utils/file";

const staffMiddlewares = {
  create: [bufferUpload.array("avatar", 1), uploadAvatar],
  update: [bufferUpload.array("newImages", 1), uploadAvatar],
};

const staffRouter = createBaseRouter(staffController, staffMiddlewares);

export default staffRouter;
