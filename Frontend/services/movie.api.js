import ApiClient from "./axios";
import { createFormData } from "@/utils/formUtils";

class MovieApi extends ApiClient {
  constructor() {
    super("/movies");
  }

  async getAll() {
    const data = (await this.api.get("/")).data;
    return data.map((item) => ({
      ...item,
      video: [
        {
          url: item.url,
          publicId: item.storagePath,
        },
      ],
    }));
  }

  async getList(params = {}) {
    const data = (await this.api.get("/",{params})).data;
    return data;
  }

  async getById(id) {
    const data = (await this.api.get(`/${id}`)).data;
    return {
      ...data,
      video:
        data.url && data.storagePath
          ? [{ url: data.url, publicId: data.storagePath }]
          : [],
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

export default new MovieApi();
