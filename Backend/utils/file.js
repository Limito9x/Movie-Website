const multer = require('multer');
const path = require('path');
const {bucket} = require('../config')

const storage = multer.memoryStorage();

const bufferUpload = multer({
    storage, // Lưu vào req.file.buffer (bộ nhớ tạm thời)
    limits: { fileSize: 30*1024*1024}, // Giới hạn file là 10MB
    fileFilter: (req,file,cb) => {
        const filetypes = /jpeg|jpg|png|webm|mp4|mov/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // extname -> kiểm tra đuôi file có hợp filetypes không
        if(extname) {
            return cb(null,true);
        }
        cb(new Error("Only images or videos are allowed"));
    }
})

function getPublicImageUrl(destinationPath) {
  const baseUrl = process.env.STORAGE_BASE_URL;
  const bucketName = process.env.STORAGE_BUCKET;

  if (!baseUrl || !bucketName) {
    console.warn(
      "Firebase Storage base URL or bucket name not configured in .env"
    );
    return null;
  }

  return `${baseUrl}/${bucketName}/o/${encodeURIComponent(
    destinationPath
  )}?alt=media`;
}

async function firebaseUpload(file) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }
    const fileName = `${Date.now()}-${file.originalname}`; //Tên file là duy nhất
    const fileBuffer = file.buffer; // Lấy dữ liệu file từ buffer (đã được viết từ middleware bufferUpload)
    const fileType = file.mimetype; // mimetype --> loại file hoặc hiểu là đuôi file như jpg,mp4,...
    let destinationPath = ""; // điểm đến cuối ta sẽ lưu trong storage
  
    // Xác định thư mục dựa trên loại file
    if (fileType.includes("image/")) {
      destinationPath = `images/${fileName}`;
    } else if (fileType.includes("video/")) {
      destinationPath = `videos/${fileName}`;
    } else {
      throw new Error("The file type is not supported");
    }

    // Cấu hình metadata (tìm hiều trong readme) tùy chọn (ví dụ: Content-Type)
    const metadata = {
      contentType: fileType,
      cacheControl: 'public, max-age=86400',// Lưu cache khi có yêu để sử dụng lại từ cache khi reload trang
    };
    // Tải lên file lên Firebase Storage từ buffer
    await bucket.file(destinationPath).save(fileBuffer,{metadata});
    // Lấy URL công khai của file vừa tải lên
    const publicUrl = getPublicImageUrl(destinationPath);

    return {
      message: "File has been uploaded to Firebase Storage successfully!",
      url: publicUrl,
      storagePath: destinationPath, // Đường dẫn trên Storage
    };
  } catch (error) {
    console.error("Error uploading to Firebase Storage:", error);
    throw error; // Ném lỗi để caller xử lý
  }
}

async function deleteFile(storagePath) {
  try {
    console.log(storagePath);
    const file = bucket.file(storagePath);
    file.delete();
  }catch(error){
    throw error;
  }
}

module.exports = {bufferUpload,firebaseUpload,deleteFile};