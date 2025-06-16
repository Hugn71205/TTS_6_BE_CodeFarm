import { Router } from 'express';
const router = Router();
import { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand } from '../controllers/brandController.js';

router.get('/', getAllBrands);
router.get('/:id', getBrandById);
router.post('/', createBrand);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);

export default router;
