import genreApi from "../../services/genre.api";
import tagApi from "../../services/tag.api";
import actorApi from "../../services/actor.api";
import movieApi from "../../services/movie.api";

import {
  text,
  select,
  option,
  date,
  atc,
  dropzone,
  updateFile,
} from "../inputs/";

interface AttributeProps {
  key: string;
  label: string;
  input: any;
}

// Hàm định nghĩa thuộc tính đối tượng
const attr = (key: string, label: string, input: any = text()) => ({
  key,
  propname: key,
  label,
  input,
});

// Hàm thêm trường name nhanh vào thuộc tính đối tượng

const addName = (name: string, config: AttributeProps[]) => {
  return config?.map((attrObj) => ({
    ...attrObj,

    name: `${name}_${attrObj.key}`,
  }));
};

// Cấu hình cuối cùng cho đối tượng

interface ConfigResult {
  name: string;
  label: string;
  api: any;
  base: ReturnType<typeof addName>;
  create?: ReturnType<typeof addName>;
  update?: ReturnType<typeof addName>;
}

export const defineConfig = (
  name: string,
  label: string,
  api: any,
  base: AttributeProps[],
  create?: AttributeProps[],
  update?: AttributeProps[]
): ConfigResult => {
  const baseConfig = addName(name, base);
  const finalConfig: ConfigResult = { name, label, api, base: baseConfig };
  if (create) {
    finalConfig.create = addName(name, [...base, ...create]);
  }
  if (update) {
    finalConfig.update = addName(name, [...base, ...update]);
  }
  return finalConfig;
};

// ---
// ## Định nghĩa Cấu hình Cơ bản
// Định nghĩa các thuộc tính cơ bản cho từng đối tượng
// ---

const genreBase = [attr("name", "Tên thể loại"), attr("description", "Mô tả")];

const tagBase = [attr("name", "Tên thẻ"), attr("description", "Mô tả")];

const actorBase = [
  attr("name", "Tên diễn viên"),
  attr(
    "sex",
    "Giới tính",
    select([option("true", "Nữ"), option("false", "Nam")])
  ),
  attr("dateOfBirth", "Ngày sinh", date),
];
const actorCreate = [
  attr("avatar", "Ảnh đại diện", dropzone(1, "image", "create")),
];
const actorUpdate = [
  attr("avatar", "Ảnh đại diện", updateFile(1, "image", "url", "publicId")),
];

const register = [
  attr("fullName", "Họ và tên"),
  attr("dateOfBirth", "Ngày sinh", date),
  attr(
    "sex",
    "Giới tính",
    select([option("true", "Nữ"), option("false", "Nam")])
  ),
  attr("email", "Email", text("email")),
  attr("username", "Tên đăng nhập"),
  attr("password", "Mật khẩu", text("password")),
];

// ---
// ## Tạo Cấu hình Cuối cùng
// Tạo các cấu hình cuối cùng trước khi sử dụng chúng.
// ---

export const genreConfig = defineConfig(
  "genre",
  "Thể loại",
  genreApi,
  genreBase
);
export const tagConfig = defineConfig("tag", "Tag", tagApi, tagBase);
export const actorConfig = defineConfig(
  "actor",
  "Diễn viên",
  actorApi,
  actorBase,
  actorCreate,
  actorUpdate
);

const movieBase = [
  attr("title", "Tên phim"),
  attr("description", "Mô tả"),
  // Sử dụng các config đã được export ở trên
  attr("actors", "Diễn viên", atc(actorConfig, "name")),
  attr("genres", "Thể loại", atc(genreConfig, "name")),
  attr("tags", "Tag", atc(tagConfig, "name")),
  attr("releaseDate", "Ngày phát hành", date),
];
const movieCreate = [
  attr("video", "Video", dropzone(1, "video", "create")),
  attr("images", "Hình ảnh", dropzone(5, "image", "create")),
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
  "Phim",
  movieApi,
  movieBase,
  movieCreate,
  movieUpdate
);

