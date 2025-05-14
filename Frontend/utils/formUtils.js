export const createFormData = (data, video, images) => {
  console.log("Data to be sent:", data, video, images);
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

  if (video) formData.append("video", video);
  if (images)
    images.forEach((image) => {
      formData.append("images", image);
    });
  return formData;
};

export const handleInputChange = (setData, event, values, propName) => {
  if (values&&propName) {
    const ids = values.map((value) => value.id);
    setData((prev) => ({
      ...prev,
      [propName]: ids,
    }));
    return;
  }
  const { name, value } = event.target;
  setData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const handleFileChange = (setFile, event) => {
  const file = event.target.files[0];
  console.log("Selected file:", file);
  if (file) {
    setFile(file);
  }
};
