import express from "express";
import cors from "cors";
import { sequelize } from "./config/index";
import movieRoutes from "./routes/movie.route";
import actorRoutes from "./routes/actor.route";
import genreRoutes from "./routes/genre.route";
import tagRoutes from "./routes/tag.route";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Định tuyến
app.use("/movies", movieRoutes);
app.use("/actors", actorRoutes);
app.use("/genres", genreRoutes);
app.use("/tags", tagRoutes);

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Error syncing database"));

export default app;
