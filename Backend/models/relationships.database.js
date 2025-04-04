const Movie = require("./movie");
const Actor = require("./actor");
const Genre = require("./genre");

// Thiết lập mối quan hệ nhiều-nhiều giữa phim và diễn viên
Movie.belongsToMany(Actor, { through: "MovieActor" });
Actor.belongsToMany(Movie, { through: "MovieActor" });

// Thiết lập mối quan hệ nhiều-nhiều giữa phim và thể loại
Movie.belongsToMany(Genre, { through: "MovieGenre" });
Genre.belongsToMany(Movie, { through: "MovieGenre" });

module.exports = { Movie, Actor, Genre };