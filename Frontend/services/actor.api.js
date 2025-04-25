import ApiClient from "./axios";

class ActorApi extends ApiClient {
  constructor() {
    super("/actors");
  }
}

export default new ActorApi();