import ApiClient from "./axios";

class MovieApi extends ApiClient {
  constructor(){
    super("/movies");
  }
}

export default new MovieApi();