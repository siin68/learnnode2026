import { Request, Response } from 'express';
import { TableModel } from '../models/Table';

export class TableController {
  // GET /api/tables - Lấy tất cả bàn
  static async getAllTables(req: Request, res: Response) {
    try {
      const tables = await TableModel.getAll();
      res.json({
        success: true,
        data: tables
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching tables',
        error: error.message
      });
    }
  }

  // GET /api/tables/:id - Lấy bàn theo ID (kèm món ăn)
  static async getTableById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const table = await TableModel.getById(id);
      
      if (!table) {
        return res.status(404).json({
          success: false,
          message: 'Table not found'
        });
      }

      res.json({
        success: true,
        data: table
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching table',
        error: error.message
      });
    }
  }

  // POST /api/tables - Tạo bàn mới
  static async createTable(req: Request, res: Response) {
    try {
      const { tableNumber, capacity, status } = req.body;
      
      const newTable = await TableModel.create({
        tableNumber,
        capacity,
        status
      });

      res.status(201).json({
        success: true,
        data: newTable
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error creating table',
        error: error.message
      });
    }
  }

  // PUT /api/tables/:id - Cập nhật bàn
  static async updateTable(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const { tableNumber, capacity, status } = req.body;

      const updatedTable = await TableModel.update(id, {
        tableNumber,
        capacity,
        status
      });

      res.json({
        success: true,
        data: updatedTable
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error updating table',
        error: error.message
      });
    }
  }

  // DELETE /api/tables/:id - Xóa bàn
  static async deleteTable(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      await TableModel.delete(id);

      res.json({
        success: true,
        message: 'Table deleted successfully'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error deleting table',
        error: error.message
      });
    }
  }

  // POST /api/tables/:id/foods - Thêm món vào bàn
  static async addFoodToTable(req: Request, res: Response) {
    try {
      const tableId = parseInt(req.params.id as string);
      const { foodId, quantity, price } = req.body;

      const tableFood = await TableModel.addFood(tableId, foodId, quantity, price);

      res.status(201).json({
        success: true,
        data: tableFood
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error adding food to table',
        error: error.message
      });
    }
  }

  // DELETE /api/tables/foods/:tableFoodId - Xóa món khỏi bàn
  static async removeFoodFromTable(req: Request, res: Response) {
    try {
      const tableFoodId = parseInt(req.params.tableFoodId as string);
      await TableModel.removeFood(tableFoodId);

      res.json({
        success: true,
        message: 'Food removed from table successfully'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error removing food from table',
        error: error.message
      });
    }
  }
}