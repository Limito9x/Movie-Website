import actorController from "../controllers/actor.controller";
import { uploadActor } from "../middlewares/upload.middleware";
import { createBaseRouter } from "./baseRouter";
import { bufferUpload } from "../utils/file";

const actorMiddlewares = {
  create: [bufferUpload.array("avatar",1), uploadActor],
  update: [bufferUpload.array("newImages",1), uploadActor],
};

const actorRouter = createBaseRouter(actorController, actorMiddlewares);

export default actorRouter;
