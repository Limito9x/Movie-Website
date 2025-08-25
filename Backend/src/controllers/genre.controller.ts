import BaseController from "./baseController";
import { Genre } from "../models";

class GenreController extends BaseController {
  constructor() {
    super(Genre, []);
  }
}

export default new GenreController();
