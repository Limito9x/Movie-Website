import actorController from "../controllers/actor.controller";
import { uploadSingle } from "../middlewares/upload.middleware";
import { createBaseRouter } from "./baseRouter";
import { bufferUpload } from "../utils/file";

const actorMiddlewares = {
  create: [bufferUpload.single("images"), uploadSingle],
};

const actorRouter = createBaseRouter(actorController, actorMiddlewares);

export default actorRouter;
