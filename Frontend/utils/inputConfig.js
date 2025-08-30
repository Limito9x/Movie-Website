import genreApi from "@/services/genre.api";
import actorApi from "@/services/actor.api";
import tagApi from "@/services/tag.api";

// ---
// ## 1. Các Hàm Hỗ Trợ
// Các hàm này tạo ra các đối tượng cấu hình input.
// ---

const text = {
  name: "text",
  initValue: "",
};

const option = (value, label) => {
  return { value, label };
};

const select = (range) => {
  return {
    name: "select",
    initValue: "",
    range,
  };
};

const date = {
  name: "date",
  initValue: "",
};

// Hàm lấy tên thuộc tính nhãn (label prop name)
const getOptionLabel = (config) => {
  if (config.create) return config.create[0].key;
  if (config.update) return config.update[0].key;
  // Trường hợp không có create/update, lấy key đầu tiên từ mảng base
  return config[0] ? config[0].key : "name";
};

const atc = (api, detailConfig) => ({
  name: "autoComplete",
  api,
  initValue: [],
  detailConfig,
  optionLabel: getOptionLabel(detailConfig),
});

const dropzone = (maxFiles, fileType) => ({
  name: "dropzone",
  maxFiles,
  fileType,
});

const updateFile = (maxFiles, fileType, urlName, publicIdName) => ({
  name: "updateFile",
  maxFiles,
  fileType,
  urlName,
  publicIdName,
  addPropname: `new${fileType}s`,
  delPropname: `del${fileType}s`,
});

// Hàm định nghĩa thuộc tính đối tượng
const attr = (key, label, input = text) => ({
  key,
  label,
  input,
});

// Hàm thêm trường name nhanh vào thuộc tính đối tượng

const addName = (name, config) => {
  return config.map((attrObj) => ({
    ...attrObj,

    name: `${name}_${attrObj.key}`,
  }));
};

// Cấu hình cuối cùng cho đối tượng

const defineConfig = (instanceName, base, create, update) => {
  if (create || update) {
    let finalConfig = {};
    if (create) {
      finalConfig.create = addName(instanceName, [...base, ...create]);
    }
    if (update) {
      finalConfig.update = addName(instanceName, [...base, ...update]);
    }
    return finalConfig;
  }
  return addName(instanceName, base);
};

// ---
// ## 2. Định nghĩa Cấu hình Cơ bản
// Định nghĩa các thuộc tính cơ bản cho từng đối tượng
// ---

const genre = [attr("name", "Tên thể loại"), attr("description", "Mô tả")];

const tag = [attr("name", "Tên thẻ"), attr("description", "Mô tả")];

const actor = [
  attr("name", "Tên diễn viên"),
  attr(
    "sex",
    "Giới tính",
    select([option("true", "Nữ"), option("false", "Nam")])
  ),
  attr("dateOfBirth", "Ngày sinh", date),
];
const actorCreate = [attr("avatar", "Ảnh đại diện", dropzone(1, "image"))];
const actorUpdate = [
  attr("avatar", "Ảnh đại diện", updateFile(1, "image", "url", "publicId")),
];

// ---
// ## 3. Tạo Cấu hình Cuối cùng
// Tạo các cấu hình cuối cùng trước khi sử dụng chúng.
// ---

export const genreConfig = defineConfig("genre", genre);
export const tagConfig = defineConfig("tag", tag);
export const actorConfig = defineConfig(
  "actor",
  actor,
  actorCreate,
  actorUpdate
);

const movie = [
  attr("title", "Tên phim"),
  attr("description", "Mô tả"),
  // Sử dụng các config đã được export ở trên
  attr("actors", "Diễn viên", atc(actorApi, actorConfig)),
  attr("genres", "Thể loại", atc(genreApi, genreConfig)),
  attr("tags", "Tag", atc(tagApi, tagConfig)),
  attr("releaseDate", "Ngày phát hành", date),
];
const movieCreate = [
  attr("video", "Video", dropzone(1, "video")),
  attr("images", "Hình ảnh", dropzone(5, "image")),
];
const movieUpdate = [
  attr("video", "Video", updateFile(1, "video", "url", "publicId")),
  attr(
    "images",
    "Hình ảnh",
    updateFile(5, "image", "image_url", "storagePath")
  ),
];

export const movieConfig = defineConfig(
  "movie",
  movie,
  movieCreate,
  movieUpdate
);
