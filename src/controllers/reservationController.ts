import { Request, Response } from 'express';
import { ReservationModel } from '../models/Reservation';

export class ReservationController {
  // GET /api/reservations - Lấy tất cả đặt chỗ
  static async getAllReservations(req: Request, res: Response) {
    try {
      const reservations = await ReservationModel.getAll();
      res.json({
        success: true,
        data: reservations
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách đặt chỗ',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // GET /api/reservations/:id - Lấy đặt chỗ theo ID
  static async getReservationById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const reservation = await ReservationModel.getById(id);

      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đặt chỗ'
        });
      }

      res.json({
        success: true,
        data: reservation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy thông tin đặt chỗ',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /api/reservations - Tạo đặt chỗ mới
  static async createReservation(req: Request, res: Response) {
    try {
      const { tableId, customerName, customerPhone, customerEmail, reservationDate, numberOfPeople, notes } = req.body;

      // Validation
      if (!tableId || !customerName || !customerPhone || !reservationDate || !numberOfPeople) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu thông tin bắt buộc'
        });
      }

      const reservation = await ReservationModel.create({
        tableId: parseInt(tableId),
        customerName,
        customerPhone,
        customerEmail,
        reservationDate: new Date(reservationDate),
        numberOfPeople: parseInt(numberOfPeople),
        notes
      });

      res.status(201).json({
        success: true,
        data: reservation,
        message: 'Đặt chỗ thành công'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi tạo đặt chỗ',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // PUT /api/reservations/:id - Cập nhật đặt chỗ
  static async updateReservation(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const { tableId, customerName, customerPhone, customerEmail, reservationDate, numberOfPeople, status, notes } = req.body;

      const reservation = await ReservationModel.update(id, {
        ...(tableId && { tableId: parseInt(tableId) }),
        ...(customerName && { customerName }),
        ...(customerPhone && { customerPhone }),
        ...(customerEmail !== undefined && { customerEmail }),
        ...(reservationDate && { reservationDate: new Date(reservationDate) }),
        ...(numberOfPeople && { numberOfPeople: parseInt(numberOfPeople) }),
        ...(status && { status }),
        ...(notes !== undefined && { notes })
      });

      res.json({
        success: true,
        data: reservation,
        message: 'Cập nhật đặt chỗ thành công'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi cập nhật đặt chỗ',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // DELETE /api/reservations/:id - Xóa đặt chỗ
  static async deleteReservation(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      await ReservationModel.delete(id);

      res.json({
        success: true,
        message: 'Xóa đặt chỗ thành công'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi xóa đặt chỗ',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // GET /api/reservations/status/:status - Lấy đặt chỗ theo trạng thái
  static async getReservationsByStatus(req: Request, res: Response) {
    try {
      const { status } = req.params;
      const reservations = await ReservationModel.getByStatus(status as string);

      res.json({
        success: true,
        data: reservations
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách đặt chỗ',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}