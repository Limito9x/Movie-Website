import createApiClient from "./axios";

class MovieApi {
  constructor(baseUrl = "http://localhost:3000/movies") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async create(data) {

    return (
      await this.api.post("/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, data, file) {
    const formData = new FormData();
    // Thêm tất cả dữ liệu phim vào formData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return (
      await this.api.patch(`/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new MovieApi();
