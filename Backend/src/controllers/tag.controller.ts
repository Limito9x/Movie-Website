import BaseController from "./baseController";
import { Tag } from "../models";

class TagController extends BaseController {
    constructor(){
        super(Tag, [])
    }
}

export default new TagController();