export const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (Array.isArray(value)) {
      value.forEach((item) => {
        const realFile = item instanceof File ? item : item.file;
        if (realFile instanceof File) {
          formData.append(key, realFile);
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
