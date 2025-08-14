require("dotenv").config();
const { Sequelize } = require("sequelize");
const cloudinary = require('cloudinary').v2; 

// Backend Server
const appConfig = {
  port: process.env.PORT || 3000,
};

// Database
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "moviedb",
  port: process.env.DB_PORT || 3306,
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    port: dbConfig.port,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connecting to database successfully!");
  })
  .catch((err) => {
    console.error("An error occured while connecting to database: ", err);
  });

// Cloud
const {CLOUD_NAME,API_KEY,API_SECRET} = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})

module.exports = {
  appConfig,
  sequelize,
  cloudinary
};
