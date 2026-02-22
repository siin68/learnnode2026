import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FoodModel {
  // Lấy tất cả món ăn
  static async getAll() {
    return await prisma.food.findMany({
      omit: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  // Lấy món ăn theo ID
  static async getById(id: number) {
    return await prisma.food.findUnique({
      where: { id },
      omit: {
        createdAt: true,
      }
    });
  }

  // Tạo món ăn mới
  static async create(data: {
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
  }) {
    return await prisma.food.create({
      data
    });
  }

  // Cập nhật món ăn
  static async update(id: number, data: {
    name?: string;
    price?: number;
    description?: string;
    imageUrl?: string;
  }) {
    return await prisma.food.update({
      where: { id },
      data
    });
  }

  // Xóa món ăn
  static async delete(id: number) {
    return await prisma.food.delete({
      where: { id }
    });
  }
}
