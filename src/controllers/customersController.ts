// controllers/customersController.ts

import { Request, Response } from 'express';
import Customer from '../db/models/cliente';

// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();
    return res.status(200).json(customers);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Get a single customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (customer) {
      return res.status(200).json(customer);
    }
    return res.status(404).json({ message: 'Cliente non trovato' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    
    const { nome, cognome, telefono, email } = req.body;
    const newCustomer = await Customer.create({ nome, cognome, telefono, email });
    return res.status(201).json(newCustomer);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Update a customer by ID
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, cognome, telefono, email } = req.body;
    const customer = await Customer.findByPk(id);
    if (customer) {
      customer.nome = nome;
      customer.cognome = cognome;
      customer.telefono = telefono;
      customer.email = email;
      await customer.save();
      return res.status(200).json(customer);
    }
    return res.status(404).json({ message: 'Cliente non trovato' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

// Delete a customer by ID
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (customer) {
      await customer.destroy();
      return res.status(200).json({ message: 'Cliente cancellato' });
    }
    return res.status(404).json({ message: 'Cliente non trovato' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};
