import BaseController from "./baseController";
import { Actor } from "../models";

class ActorController extends BaseController {
  constructor() {
    super(Actor, []);
  }
}

export default new ActorController();
