import { Router } from 'express';
import { FoodController } from '../controllers/foodController';

const router = Router();

// GET /api/foods - Lấy tất cả món ăn
router.get('/', FoodController.getAllFoods);

// GET /api/foods/:id - Lấy món ăn theo ID
router.get('/:id', FoodController.getFoodById);

// POST /api/foods - Tạo món ăn mới
router.post('/', FoodController.createFood);

// PUT /api/foods/:id - Cập nhật món ăn
router.put('/:id', FoodController.updateFood);

// DELETE /api/foods/:id - Xóa món ăn
router.delete('/:id', FoodController.deleteFood);

export default router;
