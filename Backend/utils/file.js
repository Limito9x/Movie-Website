const multer = require('multer');
require("dotenv").config();
const path = require('path');
const {cloudinary} = require('../config');
const streamifier = require('streamifier');

const storage = multer.memoryStorage();

const bufferUpload = multer({
    storage, // Lưu vào req.file.buffer (bộ nhớ tạm thời)
    limits: { fileSize: 30*1024*1024}, // Giới hạn file là 10MB
    fileFilter: (req,file,cb) => {
        const filetypes = /jpeg|jpg|png|webm|webp|mp4|mov/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // extname -> kiểm tra đuôi file có hợp filetypes không
        if(extname) {
            return cb(null,true);
        }
        cb(new Error("Only images or videos are allowed"));
    }
})


async function cloudinaryUpload(file, folderPath) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `Movie Project/${folderPath}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

// Xóa file (ảnh / video)
async function cloudinaryDelete(publicId, resourceType = "image") {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log("Delete result:", result);
    return result;
  } catch (err) {
    console.error("Error deleting file from Cloudinary:", err);
    throw err;
  }
}


module.exports = {bufferUpload, cloudinaryUpload, cloudinaryDelete};