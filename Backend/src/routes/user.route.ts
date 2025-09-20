import userController from "../controllers/user.controller";
import { uploadAvatar } from "../middlewares/upload.middleware";
import { createBaseRouter } from "./baseRouter";
import { bufferUpload } from "../utils/file";

const userMiddlewares = {
  // create: [bufferUpload.array("avatar", 1), uploadAvatar],
  update: [bufferUpload.array("newImages", 1), uploadAvatar],
};

const userRouter = createBaseRouter(userController, userMiddlewares);

export default userRouter;
