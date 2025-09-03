import actorController from "../controllers/actor.controller";
import { uploadAvatar } from "../middlewares/upload.middleware";
import { createBaseRouter } from "./baseRouter";
import { bufferUpload } from "../utils/file";

const actorMiddlewares = {
  create: [bufferUpload.array("avatar",1), uploadAvatar],
  update: [bufferUpload.array("newImages",1), uploadAvatar],
};

const actorRouter = createBaseRouter(actorController, actorMiddlewares);

export default actorRouter;
