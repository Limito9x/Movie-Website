const Movie = require("./movie");
const Actor = require("./actor");
const Genre = require("./genre");
const MovieImage = require("./movieImages")

// Thiết lập mối quan hệ nhiều-nhiều giữa phim và diễn viên
Movie.belongsToMany(Actor, { through: "MovieActor" });
Actor.belongsToMany(Movie, { through: "MovieActor" });

// Thiết lập mối quan hệ nhiều-nhiều giữa phim và thể loại
Movie.belongsToMany(Genre, { through: "MovieGenre" });
Genre.belongsToMany(Movie, { through: "MovieGenre" });

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

module.exports = { Movie, Actor, Genre, MovieImage };