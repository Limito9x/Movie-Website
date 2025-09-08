import express from "express";
import cors from "cors";
import { sequelize } from "./config/index";
import movieRoutes from "./routes/movie.route";
import actorRoutes from "./routes/actor.route";
import genreRoutes from "./routes/genre.route";
import tagRoutes from "./routes/tag.route";
import userRouter from "./routes/user.route";
import staffRouter from "./routes/staff.route";
import { createAdmin } from "./services/admin.service";
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
app.use("/users", userRouter);
app.use("/staffs", staffRouter);

sequelize
  .sync()
  .then(async () => {
    console.log("Database synced");
    await createAdmin();
  })
  .catch((err) => console.error("Error syncing database"));

export default app; 
