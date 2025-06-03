import Volume from "../models/Volume.js";

// Tạo mới volume
export const createVolume = async (req, res) => {
  try {
    const { size, label } = req.body;

    const newVolume = new Volume({ size, label });
    const savedVolume = await newVolume.save();

    res.status(201).json(savedVolume);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo volume", error });
  }
};

// Lấy danh sách tất cả volumes
export const getAllVolumes = async (req, res) => {
  try {
    const volumes = await Volume.find();
    res.json(volumes);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách volumes", error });
  }
};

// Lấy chi tiết volume theo id
export const getVolumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const volume = await Volume.findById(id);
    if (!volume) {
      return res.status(404).json({ message: "Không tìm thấy volume" });
    }
    res.json(volume);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết volume", error });
  }
};

// Cập nhật volume theo id
export const updateVolume = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, label } = req.body;

    const updatedVolume = await Volume.findByIdAndUpdate(
      id,
      { size, label },
      { new: true }
    );

    if (!updatedVolume) {
      return res.status(404).json({ message: "Không tìm thấy volume để cập nhật" });
    }

    res.json(updatedVolume);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật volume", error });
  }
};

// Xóa volume theo id
export const deleteVolume = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVolume = await Volume.findByIdAndDelete(id);

    if (!deletedVolume) {
      return res.status(404).json({ message: "Không tìm thấy volume để xóa" });
    }

    res.json({ message: "Xóa volume thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa volume", error });
  }
};