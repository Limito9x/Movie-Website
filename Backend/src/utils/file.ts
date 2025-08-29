import multer from "multer";
import path from "path";
import { cloudinary } from "../config";
import streamifier from "streamifier";

export interface UploadResult {
  url: string;
  public_id: string;
  // Bạn có thể thêm các thuộc tính khác nếu cần
  // format: string;
  // width: number;
}

const storage = multer.memoryStorage();

const bufferUpload = multer({
  storage, // Lưu vào req.file.buffer (bộ nhớ tạm thời)
  limits: { fileSize: 30 * 1024 * 1024 }, // Giới hạn file là 30MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webm|webp|mp4|mov/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // extname -> kiểm tra đuôi file có hợp filetypes không
    if (extname) {
      return cb(null, true);
    }
    cb(new Error("Only images or videos are allowed"));
  },
});

const cloudinaryUpload = (
  file: Express.Multer.File,
  folder: string = "images"
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: `Movie Project/${folder}` },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        // Ép kiểu một lần tại đây
        resolve(result as UploadResult);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Xóa file (ảnh / video)
async function cloudinaryDelete(publicId: string, resourceType = "image") {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    console.log("Delete result:", result);
    return result;
  } catch (err) {
    console.error("Error deleting file from Cloudinary:", err);
    throw err;
  }
}

async function cloudinaryDeleteMultiple(publicIds: string[]) {
  try {
    const result = await cloudinary.api.delete_resources(publicIds)
    console.log("Delete result:", result);
  } catch (err) {
    console.error("Error deleting file from Cloudinary:", err);
    throw err;
  }
}

export { bufferUpload, cloudinaryUpload, cloudinaryDelete, cloudinaryDeleteMultiple };
