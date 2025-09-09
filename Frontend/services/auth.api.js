import ApiClient from "./axios";

class AuthApi extends ApiClient {
  constructor() {
    super("/auth");
  }
}

export default new AuthApi();
