import ApiClient from "./axios";

class AuthApi extends ApiClient {
  constructor() {
    super("/auth");
  }

  async login(form) {
    return (await this.api.post("/login", form)).data;
  }
}

export default new AuthApi();
