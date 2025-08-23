import movieController from "../controllers/movie.controller";
import { uploadMovie } from "../middlewares/upload.middleware";
import { createBaseRouter } from "./baseRouter";
import { bufferUpload } from "../utils/file";

// Định nghĩa middleware cho route POST
const movieMiddlewares = {
  create: [
        bufferUpload.fields([
      { name: "images", maxCount: 5 },
      { name: "video", maxCount: 1 },
    ]),
    uploadMovie,
  ],
};

const movieRouter = createBaseRouter(movieController,movieMiddlewares);

export default movieRouter;

