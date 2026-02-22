import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReservationModel {
  // Lấy tất cả đặt chỗ
  static async getAll() {
    return await prisma.reservation.findMany({
      include: {
        table: true
      },
      orderBy: {
        reservationDate: 'desc'
      }
    });
  }

  // Lấy đặt chỗ theo ID
  static async getById(id: number) {
    return await prisma.reservation.findUnique({
      where: { id },
      include: {
        table: true
      }
    });
  }

  // Tạo đặt chỗ mới
  static async create(data: {
    tableId: number;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    reservationDate: Date;
    numberOfPeople: number;
    notes?: string;
  }) {
    return await prisma.reservation.create({
      data,
      include: {
        table: true
      }
    });
  }

  // Cập nhật đặt chỗ
  static async update(id: number, data: {
    tableId?: number;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    reservationDate?: Date;
    numberOfPeople?: number;
    status?: string;
    notes?: string;
  }) {
    return await prisma.reservation.update({
      where: { id },
      data,
      include: {
        table: true
      }
    });
  }

  // Xóa đặt chỗ
  static async delete(id: number) {
    return await prisma.reservation.delete({
      where: { id }
    });
  }

  // Lấy đặt chỗ theo bàn
  static async getByTableId(tableId: number) {
    return await prisma.reservation.findMany({
      where: { tableId },
      orderBy: {
        reservationDate: 'desc'
      }
    });
  }

  // Lấy đặt chỗ theo trạng thái
  static async getByStatus(status: string) {
    return await prisma.reservation.findMany({
      where: { status },
      include: {
        table: true
      },
      orderBy: {
        reservationDate: 'asc'
      }
    });
  }
}