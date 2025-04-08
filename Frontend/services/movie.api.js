import createApiClient from "./axios";

const movieApi = createApiClient("/movies"); // Truyền /movies làm endpoint

class MovieApi {
  async getAll() {
    return await movieApi.get("/"); // Không cần thêm endpoint nữa
  }

  async getById(id) {
    return await movieApi.get(`/${id}`);
  }

  async create(formData) {
    return await movieApi.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async update(id, data) {
    return await movieApi.put(`/${id}`, data);
  }

  async delete(id) {
    return await movieApi.delete(`/${id}`);
  }
}

export default new MovieApi();
