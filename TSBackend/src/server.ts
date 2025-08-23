import app from "./app"
import { appConfig } from "./config/index";

const PORT = appConfig.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
