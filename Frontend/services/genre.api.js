import ApiClient from "./axios";

class GenreApi extends ApiClient {
    constructor(){
        super("/genres");
    }   
}

export default new GenreApi();