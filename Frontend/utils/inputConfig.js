import genreApi from "@/services/genre.api";
import actorApi from "@/services/actor.api";
import tagApi from "@/services/tag.api";

export const def = (
  key,
  label,
  type,
  defaultValue,
  fileConfig,
  instance,
  detailconfig
) => {
  const baseConfig = {
    key,
    name: key,
    label,
    type: type || "text",
    defaultValue: defaultValue || "",
    instance,
    detailconfig,
  };
  if (fileConfig) {
    return {
      ...baseConfig,
      ...fileConfig,
    };
  }
  return baseConfig;
};

// For dropzone
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

// Update file sẽ truyền vào 1 config tên là updatefile
// config này tự động hiểu ra updatefile.js và chứa các tham số
// mà nó có thể tự truyền cho cả dropzone (để thêm mới khi số file
// chưa đạt tối đa
export const movieInput = [
  def("title", "Tên phim"),
  def("description", "Mô tả"),
  def("actors", "Diễn viên", "autoComplete", [], null, actorApi, actorInput),
  def("genres", "Thể loại", "autoComplete", [], null, genreApi, genreInput),
  def("tags", "Tag", "autoComplete", [], null, tagApi, tagInput),
  def("releaseDate", "Ngày phát hành", "date"),
];

const updateFileConfigDetail = (
  idName,
  fileType,
  label,
  maxFiles,
  urlPropName
) => {
  return {
    idName,
    fileType,
    label,
    maxFiles,
    urlPropName,
    addImages:[],
  };
};
// idName={"id"}
// fileType={"image"}
// label={"Hình ảnh"}
// delPropName={"deletedIds"}
// addPropName={"addImages"}
// maxFiles={images.length}
// urlPropName={"url"}

export const updateMovieConfig = [
  // def("video", "Video", "dropzone", [], fileConfig("video")),
  def(
    "images",
    "Hình ảnh",
    "updateFile",
    [],
    null,
    null,
    updateFileConfigDetail(
      "storagePath",
      "image",
      "Hình ảnh",
      5,
      "image_url"
    )
  ),
];
