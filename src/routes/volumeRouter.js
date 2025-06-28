import express from "express";
import {
  createVolume,
  getAllVolumes,
  getVolumeById,
  updateVolume,
  deleteVolume
} from "../controllers/volumeController.js";

const volumeRouter = express.Router();

// Route tạo dung tích
volumeRouter.post("/", createVolume);
// Route lấy danh sách dung tích
volumeRouter.get("/", getAllVolumes);
// Route lấy thống kê dung tích
volumeRouter.get("/:id", getVolumeById);
// Route cập nhật dung tích
volumeRouter.put("/:id", updateVolume);
// Route xóa dung tích
volumeRouter.delete("/:id", deleteVolume);

export default volumeRouter;