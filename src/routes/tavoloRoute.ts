

import { Router } from 'express';
import {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable
} from '../controllers/tablesController';

const tablesRouter = Router();

tablesRouter.get('/', getAllTables);
tablesRouter.get('/:id', getTableById);
tablesRouter.post('/', createTable);
tablesRouter.put('/:id', updateTable);
tablesRouter.delete('/:id', deleteTable);

export default tablesRouter;