// controllers/reservationsController.ts

import { Request, Response, NextFunction } from 'express';
import Reservation from '../db/models/prenotazione';
import Table from '../db/models/tavolo';
import Customer from '../db/models/cliente';


// is the table reserved
export const isReserved = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { numeroTavolo, dateTime } = req.body;

    if (!numeroTavolo || !dateTime) {
      return res.status(400).json({ message: 'numeroTavolo e dateTime sono necessari' });
    }

    const reserved = await Reservation.findOne({ where: { numeroTavolo, dateTime }});

    if (reserved) {
      return res.status(200).json('Il tavolo selezionato è già prenotato');
    }

    next(); // Tavolo disponibile
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

// Get all reservations
export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.findAll({ include: [Table, Customer] });
    return res.status(200).json(reservations);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Get free tables
export const getFreeTables = async (req: Request, res: Response) => {
  try {
    const { dateTime } = req.query;

    if (!dateTime) {
      return res.status(400).json({ message: "Il parametro dateTime è richiesto" });
    }

    const freeTables = await Table.findAll({
      include: [
        {
          model: Reservation,
          required: false,
          where: {
            dateTime: dateTime
          }
        }
      ],
      where: {
        '$Reservations.id$': null // Questo filtra i tavoli che non hanno prenotazioni alla data e ora specificata
      }
    });

    return res.status(200).json(freeTables);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

// Get a single reservation by ID
export const getReservationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id, { include: [Table, Customer] });
    if (reservation) {
      return res.status(200).json(reservation);
    }
    return res.status(404).json({ message: 'Reservation not found' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Create a new reservation
export const createReservation = async (req: Request, res: Response) => {
  try {
    const { numeroTavolo, idCliente, dateTime } = req.body;
    const newReservation = await Reservation.create({ numeroTavolo, idCliente, dateTime });
    return res.status(201).json(newReservation);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Update a reservation by ID
export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { numeroTavolo, idCliente, dateTime } = req.body;
    const reservation = await Reservation.findByPk(id);
    if (reservation) {
      reservation.numeroTavolo = numeroTavolo;
      reservation.idCliente = idCliente;
      reservation.dateTime = dateTime;
      await reservation.save();
      return res.status(200).json(reservation);
    }
    return res.status(404).json({ message: 'Reservation not found' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Delete a reservation by ID
export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);
    if (reservation) {
      await reservation.destroy();
      return res.status(200).json({ message: 'Reservation deleted' });
    }
    return res.status(404).json({ message: 'Reservation not found' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};
