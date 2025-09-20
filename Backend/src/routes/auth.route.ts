import { Router, RequestHandler } from "express";
import { login } from "../controllers/auth.controller";
import userController from "../controllers/user.controller";

const router = Router();

router.post("/login", login);

export default router;