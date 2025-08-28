export const createFormData = (data) => {
  console.log("Data to be sent:", data);
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item) => {
        formData.append(`${key}[]`, item);
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};