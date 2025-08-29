import ApiClient from "./axios";
import { createFormData } from "@/utils/formUtils";

class MovieApi extends ApiClient {
  constructor() {
    super("/movies");
  }

  async create(data) {
    const formData = createFormData(data);
    return (
      await this.api.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  }

  async update(id, data) {
    const formData = createFormData(data);
    return (
      await this.api.patch(`/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  }
}

export default new MovieApi();