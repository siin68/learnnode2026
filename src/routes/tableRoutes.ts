import { Router } from 'express';
import { TableController } from '../controllers/tableController';

const router = Router();

// GET /api/tables - Lấy tất cả bàn
router.get('/', TableController.getAllTables);

// GET /api/tables/:id - Lấy bàn theo ID (kèm món ăn)
router.get('/:id', TableController.getTableById);

// POST /api/tables - Tạo bàn mới
router.post('/', TableController.createTable);

// PUT /api/tables/:id - Cập nhật bàn
router.put('/:id', TableController.updateTable);

// DELETE /api/tables/:id - Xóa bàn
router.delete('/:id', TableController.deleteTable);

// POST /api/tables/:id/foods - Thêm món vào bàn
router.post('/:id/foods', TableController.addFoodToTable);

// DELETE /api/tables/foods/:tableFoodId - Xóa món khỏi bàn
router.delete('/foods/:tableFoodId', TableController.removeFoodFromTable);

export default router;