import tagController from "../controllers/tag.controller";
import { createBaseRouter } from "./baseRouter";

// const router = Router();

// router.get("/",tagController.getAll);
// router.get("/:id", tagController.getById);
// router.post("/", tagController.create);
// router.patch("/:id", tagController.update);
// router.delete(":/id",tagController.delete);

// export default router;

const tagRouter = createBaseRouter(tagController);

export default tagRouter;