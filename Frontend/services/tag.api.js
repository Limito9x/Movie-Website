import ApiClient from "./axios";

class TagApi extends ApiClient {
    constructor(){
        super("/tags");
    }   
}

export default new TagApi();