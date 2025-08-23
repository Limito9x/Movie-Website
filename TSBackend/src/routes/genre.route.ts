import genreController from "../controllers/genre.controller";
import { createBaseRouter } from "./baseRouter";

const actorRouter = createBaseRouter(genreController);

export default actorRouter