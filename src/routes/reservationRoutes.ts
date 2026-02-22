import { Router } from 'express';
import { ReservationController } from '../controllers/reservationController';

const router = Router();

// CRUD routes
router.get('/', ReservationController.getAllReservations);
router.get('/:id', ReservationController.getReservationById);
router.post('/', ReservationController.createReservation);
router.put('/:id', ReservationController.updateReservation);
router.delete('/:id', ReservationController.deleteReservation);

// Filter routes
router.get('/status/:status', ReservationController.getReservationsByStatus);

export default router;