import express from 'express';
import {createServicio, getServicio, getServicios, deleteServicio} from '../controllers/servicios.controllers';

const router = express.Router();

router.post('/servicios', createServicio);
router.get('/servicios', getServicios);
router.get('/servicios/:id', getServicio);
router.delete('/servicios/:id', deleteServicio);

export default router;