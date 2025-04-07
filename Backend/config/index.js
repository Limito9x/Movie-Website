require("dotenv").config();
const { Sequelize } = require("sequelize");
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = require('../Private/privateKeyFirebase.json')

let bucket;
try {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
  });
  bucket = getStorage().bucket("moviedb-admin"); // Tham chiếu đến bucket
  console.log("Firebase Admin SDK initialized successfully!");
} catch (error) {
  console.error("ERROR: Failed to initialize Firebase Admin SDK:", error);
  process.exit(1); // Thoát ứng dụng nếu không khởi tạo được Firebase
}

const appConfig = {
  port: process.env.PORT || 3000,
};

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

module.exports = {
  appConfig,
  sequelize,
  bucket,
};
