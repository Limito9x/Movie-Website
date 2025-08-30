import ApiClient from "./axios";
import { createFormData } from "@/utils/formUtils";

class ActorApi extends ApiClient {
  constructor() {
    super("/actors");
  }

  async getAll() {
    const data = (await this.api.get("/")).data;
    console.log(data)
    return data.map((item) => ({
      ...item,
      avatar: [
        {
          url: item.avatarUrl,
          publicId: item.avatarStoragePath,
        },
      ],
    }));
  }

  async getById(id) {
    const data = (await this.api.get(`/${id}`)).data;
    return {
      ...data,
      avatar: [{ url: item.avatarUrl, publicId: item.avatarStoragePath }],
    };
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

export default new ActorApi();
