export const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) {
          formData.append(key, item);
        } else {
          formData.append(`${key}[]`, item);
        }
      });
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

/**
 * Normalize form data: chuyển đổi tất cả mảng object thành mảng ID
 * Sử dụng trước khi submit form để đảm bảo dữ liệu luôn ở định dạng đúng
 *
 * @param {Object} data - Dữ liệu form cần normalize
 * @returns {Object} - Dữ liệu đã được normalize
 *
 * @example
 * const data = {
 *   name: "Movie 1",
 *   actors: [{id: 1, name: "Actor 1"}, {id: 2, name: "Actor 2"}],
 *   genres: [1, 2, 3]
 * }
 *
 * normalizeFormData(data)
 * // => {
 * //   name: "Movie 1",
 * //   actors: [1, 2],
 * //   genres: [1, 2, 3]
 * // }
 */
export const normalizeFormData = (data) => {
  if (!data || typeof data !== "object") return data;

  return Object.keys(data).reduce((acc, key) => {
    const value = data[key];

    // Kiểm tra nếu là mảng các object có thuộc tính id
    if (Array.isArray(value) && value.length > 0) {
      // Nếu phần tử đầu tiên là object và có id
      if (typeof value[0] === "object" && value[0]?.id !== undefined) {
        acc[key] = value.map((item) => item.id);
      } else {
        acc[key] = value;
      }
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});
};
