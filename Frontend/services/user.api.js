import ApiClient from "./axios";

class UserApi extends ApiClient {
  constructor() {
    super("/users");
  }
}

export default new UserApi();