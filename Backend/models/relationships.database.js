const Movie = require("./movie");
const Actor = require("./actor");
const Genre = require("./genre");
const Tag = require("./tag");
const MovieImage = require("./movieImages")

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

module.exports = { Movie, Actor, Genre, Tag ,MovieImage };