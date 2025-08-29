import actorController from "../controllers/actor.controller";
import { uploadActor } from "../middlewares/upload.middleware";
import { createBaseRouter } from "./baseRouter";
import { bufferUpload } from "../utils/file";

const actorMiddlewares = {
  create: [bufferUpload.single("images"), uploadActor],
};

const actorRouter = createBaseRouter(actorController, actorMiddlewares);

export default actorRouter;
