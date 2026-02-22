import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TableModel {
  // Lấy tất cả bàn
  static async getAll() {
    return await prisma.table.findMany({
      orderBy: { tableNumber: 'asc' }
    });
  }

  // Lấy bàn theo ID (kèm danh sách món ăn)
  static async getById(id: number) {
    return await prisma.table.findUnique({
      where: { id },
      include: {
        tableFoods: {
          include: {
            food: true // Lấy thông tin món ăn
          }
        }
      }
    });
  }

  // Tạo bàn mới
  static async create(data: { tableNumber: number; capacity: number; status?: string }) {
    return await prisma.table.create({
      data
    });
  }

  // Cập nhật bàn
  static async update(id: number, data: { tableNumber?: number; capacity?: number; status?: string }) {
    return await prisma.table.update({
      where: { id },
      data
    });
  }

  // Xóa bàn
  static async delete(id: number) {
    return await prisma.table.delete({
      where: { id }
    });
  }

  // Thêm món ăn vào bàn
  static async addFood(tableId: number, foodId: number, quantity: number, price: number) {
    return await prisma.tableFood.create({
      data: {
        tableId,
        foodId,
        quantity,
        price
      }
    });
  }

  // Xóa món ăn khỏi bàn
  static async removeFood(tableFoodId: number) {
    return await prisma.tableFood.delete({
      where: { id: tableFoodId }
    });
  }
}