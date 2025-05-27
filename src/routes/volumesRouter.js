import express from "express";
import { createVolume, deleteVolume, getAllVolumes, getVolumeById, updateVolume } from "../controllers/volumesController.js";


const volumesRouter = express.Router();

volumesRouter.post("/", createVolume);
volumesRouter.get("/", getAllVolumes);
volumesRouter.get("/:id", getVolumeById);
volumesRouter.put("/:id", updateVolume);
volumesRouter.delete("/:id", deleteVolume);

export default volumesRouter;
