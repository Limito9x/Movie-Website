import ApiClient from "./axios";
/**
 * Thiết lập 1 class chứa:
 * - Các thuộc tính:
 * + data (Dữ liệu) để hiển thị
 * + loading quản lý trạng thái
 * + instance (Kiểu API nào) vd: MovieApi,ActorApi
 * - Phương thức:
 * + constructor(ApiClient): set kiểu instance cho class này
 * * @param {ApiClient} instance
 * + fetchAllData(): gọi phương thức getAll của instance để set cho data
 * + fetchDataByID(id): tương tự trên nhưng gọi getById
 * + deleteOne(id): gửi yêu cầu xóa 1 dữ liệu
 */
export default class useApi {
  data = null;
  loading = true;
  error = false;
  instance;
  constructor(instance) {
    this.instance = instance;
  }
  async fetchAllData() {
    try {
      this.data = await this.instance.getAll();
      this.loading = false;
    } catch (error) {
      this.error = true;
      console.error("Lỗi khi lấy dữ liệu", error);
    }
  }
  async fetchDataByID(id) {
    try {
      this.data = await this.instance.getById(id);
      this.loading = false;
    } catch (error) {
      this.error = true;
      console.error("Lỗi khi lấy dữ liệu", id, error);
    }
  }
  async deleteOne(id) {
    try {
      this.data = await this.instance.delete(id);
      this.loading = false;
    } catch (error) {
      this.error = true;
      console.error("Lỗi khi lấy dữ liệu", id, error);
    }
  }
}
