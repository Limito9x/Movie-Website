import ApiClient from "./axios";
import { createFormData } from "@/utils/formUtils";

class ActorApi extends ApiClient {
  constructor() {
    super("/actors");
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

export default new ActorApi();