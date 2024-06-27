

import { Router } from 'express';
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  getFreeTables,
  isReserved
} from '../controllers/reservationsController';

const reservationsRouter = Router();

reservationsRouter.get('/tavolidisponibili', getFreeTables);
reservationsRouter.get('/', getAllReservations);
reservationsRouter.get('/:id', getReservationById);
reservationsRouter.post('/', isReserved, createReservation);
reservationsRouter.put('/:id', updateReservation);
reservationsRouter.delete('/:id', deleteReservation);

export default reservationsRouter;