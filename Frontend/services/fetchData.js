export async function fetchAllAPI(apiService) {
  try {
    const response = await apiService.getAll();
    if (response && response.data) {
      return { data: response.data, error: null, loading: false };
    } else if (response) {
      return { data: response, error: null, loading: false }; // Handle cases where getAll might return data directly
    } else {
      return {
        data: null,
        error: "Không nhận được dữ liệu từ API.",
        loading: false,
      };
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return { data: null, error: "Lỗi khi gọi API.", loading: false };
  } finally {
    // Không cần set loading về false ở đây vì đã được set trong try/catch
  }
}

export async function fetchOneAPI(apiService,id) {
  try {
    const response = await apiService.getById(id);
    if (response && response.data) {
      return { data: response.data, error: null, loading: false };
    } else if (response) {
      return { data: response, error: null, loading: false }; // Handle cases where getAll might return data directly
    } else {
      return {
        data: null,
        error: "Không nhận được dữ liệu từ API.",
        loading: false,
      };
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return { data: null, error: "Lỗi khi gọi API.", loading: false };
  } finally {
    // Không cần set loading về false ở đây vì đã được set trong try/catch
  }
}