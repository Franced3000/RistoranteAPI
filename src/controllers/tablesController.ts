// controllers/tablesController.ts

import { Request, Response } from 'express';
import Table from '../db/models/tavolo';

// Get all tables
export const getAllTables = async (req: Request, res: Response) => {
  try {
    const tables = await Table.findAll();
    return res.status(200).json(tables);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Get a single table by ID
export const getTableById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const table = await Table.findByPk(id);
    if (table) {
      return res.status(200).json(table);
    }
    return res.status(404).json({ message: 'Table not found' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Create a new table
export const createTable = async (req: Request, res: Response) => {
  try {
    const { numero, capacità } = req.body;
    const newTable = await Table.create({ numero, capacità });
    return res.status(201).json(newTable);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Update a table by ID
export const updateTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { numero, capacità } = req.body;
    const table = await Table.findByPk(id);
    if (table) {
      table.numero = numero;
      table.capacità = capacità;
      await table.save();
      return res.status(200).json(table);
    }
    return res.status(404).json({ message: 'Table not found' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Delete a table by ID
export const deleteTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const table = await Table.findByPk(id);
    if (table) {
      await table.destroy();
      return res.status(200).json({ message: 'Table deleted' });
    }
    return res.status(404).json({ message: 'Table not found' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};
