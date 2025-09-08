import Movie from "./movie";
import MovieImage from "./movieImages";
import Actor from "./actor";
import Tag from "./tag";
import Genre from "./genre";
import User  from "./user";
import StaffInfo from "./staffInfo";

// Thiết lập mối quan hệ nhiều-nhiều giữa phim và diễn viên
Movie.belongsToMany(Actor, { through: "MovieActor",as: "actors" });
Actor.belongsToMany(Movie, { through: "MovieActor",as: "movies" });

// Thiết lập mối quan hệ nhiều-nhiều giữa phim và thể loại
Movie.belongsToMany(Genre, { through: "MovieGenre",as: "genres" });
Genre.belongsToMany(Movie, { through: "MovieGenre",as: "movies" });

// Thiết lập mối quan hệ nhiều-nhiều giữa phim và tag
Movie.belongsToMany(Tag, { through: "MovieTag",as: "tags" });
Tag.belongsToMany(Movie, { through: "MovieTag",as: "movies" });

// Thiết lập mối quan hệ một-nhiều giữa phim và ảnh
Movie.hasMany(MovieImage, {
  as: "images", // Tên alias để truy cập các ảnh của phim
  foreignKey: "movieId", // Tên cột khóa ngoại trong bảng movie_images
  onDelete: "CASCADE", // Tùy chọn: Xóa tất cả ảnh khi phim bị xóa
});
MovieImage.belongsTo(Movie, {
  foreignKey: "movieId", // Tên cột khóa ngoại trong bảng movie_images
  as: "movie", // Tên alias để truy cập thông tin phim từ ảnh
});

// Thiết lập mối quan hệ một-một User[role:"staff"] và StaffInfo
// Một User có thể có không hoặc một StaffInfo (hasOne)
// Một StaffInfo phải thuộc về một User (belongsTo)
User.hasOne(StaffInfo, {
  foreignKey: "userId", // Sequelize sẽ tự động tìm khóa chính của User để liên kết
  as: "staffInfo",
  onDelete: "CASCADE",
});

StaffInfo.belongsTo(User, {
  foreignKey: "userId", // Tương tự
  as: "user",
});

export { Movie, Actor, Genre, Tag ,MovieImage, User, StaffInfo };