import express from 'express';

const router = express.Router();

import authRoutes from './routes/auth.routes';
router.use(authRoutes);

import serviciosRoutes from './routes/servicios.routes';
router.use(serviciosRoutes);


export default router;