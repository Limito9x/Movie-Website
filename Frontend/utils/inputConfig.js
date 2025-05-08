const def = (key, label, type) => ({
  key,
  label,
  type,
});

export const actorInput = [
  // { key: "title", label: "Tên diễn viên" },
  // { key: "sex", label: "Giới tính" },
  // { key: "dateOfBirth", label: "Ngày sinh", type: "date" },
  // { key: "avatar", label: "Ảnh đại diện", type: "file" },
  def("name", "Tên diễn viên"),
  def("sex", "Giới tính"),
  def("dateOfBirth", "Ngày sinh", "date"),
  def("avatar", "Ảnh đại diện", "file"),
];

export const genreInput = [
  // { key: "name", label: "Tên thể loại" },
  // { key: "description", label: "Mô tả" },
  def("name", "Tên thể loại"),
  def("description", "Mô tả"),
];

export const tagInput = [
  // { key: "name", label: "Tên tag" },
  // { key: "description", label: "Mô tả" },
  def("name", "Tên tag"),
  def("description", "Mô tả"),
];

