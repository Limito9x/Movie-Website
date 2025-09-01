import { Request, Response, NextFunction } from "express";
import { cloudinaryUpload } from "../utils/file";

export const uploadMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videoFile = req.files?.["video"]?.[0]; // có thể undefined
    const imageFiles = req.files?.["images"] || []; // nếu ko có thì rỗng

    // Xử lý upload video
    if (videoFile) {
      const videoResult = await cloudinaryUpload(videoFile, "videos");
      req.body.url = videoResult.url;
      req.body.storagePath = videoResult.public_id;
    }

    // Xử lý upload ảnh (sử dụng Promise.all để tải lên song song)
    if (imageFiles && imageFiles.length > 0) {
      const imagePromises = imageFiles.map((file) =>
        cloudinaryUpload(file, "images")
      );
      const imageResults = await Promise.all(imagePromises);

      // Gán kết quả vào req.body để controller sử dụng
      req.body.uploadedImages = imageResults.map((result) => {
        const { url, public_id } = result;
        return {
          imageUrl: url,
          imageStoragePath: public_id,
        };
      });
    }

    // Xóa các file gốc khỏi req.files để giải phóng bộ nhớ
    delete req.files;

    next();
  } catch (error) {
    // Chuyển lỗi đến middleware xử lý lỗi
    next(error);
  }
};

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videoFile = req.files?.["newVideos"]?.[0];
    const imageFiles = req.files?.["newImages"] || []; // nếu ko có thì rỗng
    console.log("new video: ", videoFile);
    console.log("new images: ",imageFiles);
    // Xử lý upload video
    if (videoFile) {
      const videoResult = await cloudinaryUpload(videoFile, "videos");
      req.body.url = videoResult.url;
      req.body.storagePath = videoResult.public_id;
    }

    // Xử lý upload ảnh (sử dụng Promise.all để tải lên song song)
    if (imageFiles && imageFiles.length > 0) {
      const imagePromises = imageFiles.map((file) =>
        cloudinaryUpload(file, "images")
      );
      const imageResults = await Promise.all(imagePromises);

      // Gán kết quả vào req.body để controller sử dụng
      req.body.uploadedImages = imageResults.map((result) => {
        const { url, public_id } = result;
        return {
          imageUrl: url,
          imageStoragePath: public_id,
        };
      });
    }

    // Xóa các file gốc khỏi req.files để giải phóng bộ nhớ
    delete req.files;

    next();
  } catch (error) {
    // Chuyển lỗi đến middleware xử lý lỗi
    next(error);
  }
};

// export const uploadActor = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const avatar = req.file;
//     if (avatar) {
//       const result = await cloudinaryUpload(avatar, "actors");
//       req.body.avatarUrl = result.url;
//       req.body.avatarStoragePath = result.public_id;
//     }
//     delete req.file;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

export const uploadActor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const avatar = (req.files as Express.Multer.File[] | undefined)?.[0];
    console.log(req.files);
    console.log(avatar)
    if (avatar) {
      const result = await cloudinaryUpload(avatar, "actors");
      req.body.avatarUrl = result.url;
      req.body.avatarStoragePath = result.public_id;
    }
    delete req.file;
    next();
  } catch (error) {
    next(error);
  }
};
