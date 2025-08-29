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
