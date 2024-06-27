import { Router } from 'express'
import tablesRouter from './tavoloRoute';
import customersRouter from './clienteRoute';
import reservationsRouter from './prenotazioneRoute';

const router = Router()

router.use('/tavoli', tablesRouter)
router.use('/clienti', customersRouter)
router.use('/prenotazioni', reservationsRouter)

export default router