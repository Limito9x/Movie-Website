const def = (key, label, type, defaultValue, fileConfig) => {
  const baseConfig = {
    key,
    name: key,
    label,
    type: type || "text",
    defaultValue: defaultValue || "",
  };
  if (fileConfig) {
    return {
      ...baseConfig,
      ...fileConfig,
    };
  }

  return baseConfig;
};

const fileConfig = (fileType, maxFiles) => ({
  fileType: fileType || "image",
  maxFiles: maxFiles || 5,
});

export const actorInput = [
  def("name", "Tên diễn viên"),
  def("sex", "Giới tính", "sex"),
  def("dateOfBirth", "Ngày sinh", "date"),
  def("avatar", "Ảnh đại diện", "dropzone", [], fileConfig("image", 1)),
];

export const genreInput = [
  def("name", "Tên thể loại"),
  def("description", "Mô tả"),
];

export const tagInput = [def("name", "Tên tag"), def("description", "Mô tả")];
