import { Request, Response } from 'express';
import { FoodModel } from '../models/Food';

export class FoodController {
  // GET /api/foods - Lấy tất cả món ăn
  static async getAllFoods(req: Request, res: Response) {
    try {
      const foods = await FoodModel.getAll();
      res.json({
        success: true,
        data: foods
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách món ăn',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // GET /api/foods/:id - Lấy món ăn theo ID
  static async getFoodById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const food = await FoodModel.getById(id);

      if (!food) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy món ăn'
        });
      }

      res.json({
        success: true,
        data: food
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy thông tin món ăn',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /api/foods - Tạo món ăn mới
  static async createFood(req: Request, res: Response) {
    try {
      const { name, price, description, imageUrl } = req.body;

      // Validation
      if (!name || !price) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu thông tin bắt buộc (name, price)'
        });
      }

      const food = await FoodModel.create({
        name,
        price: parseFloat(price),
        description,
        imageUrl
      });

      res.status(201).json({
        success: true,
        data: food,
        message: 'Tạo món ăn thành công'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo món ăn',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // PUT /api/foods/:id - Cập nhật món ăn
  static async updateFood(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const { name, price, description, imageUrl } = req.body;

      const food = await FoodModel.update(id, {
        ...(name && { name }),
        ...(price && { price: parseFloat(price) }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl })
      });

      res.json({
        success: true,
        data: food,
        message: 'Cập nhật món ăn thành công'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật món ăn',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // DELETE /api/foods/:id - Xóa món ăn
  static async deleteFood(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      await FoodModel.delete(id);

      res.json({
        success: true,
        message: 'Xóa món ăn thành công'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi xóa món ăn',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
