import Brand from '../models/Brand.js';

// [GET] /brands - Lấy tất cả brands
export async function getAllBrands(req, res) {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// [GET] /brands/:id - Lấy 1 brand theo ID
export async function getBrandById(req, res) {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// [POST] /brands - Tạo brand mới
export async function createBrand(req, res) {
  try {
    const { name, origin, logo } = req.body;
    const newBrand = new Brand({ name, origin, logo });
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// [PUT] /brands/:id - Cập nhật brand theo ID
export async function updateBrand(req, res) {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBrand) return res.status(404).json({ message: 'Brand not found' });
    res.json(updatedBrand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// [DELETE] /brands/:id - Xoá brand theo ID
export async function deleteBrand(req, res) {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) return res.status(404).json({ message: 'Brand not found' });
    res.json({ message: 'Brand deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}