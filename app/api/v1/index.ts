import { Router } from 'express';
import { router as recitatorRoutes } from '@/api/v1/recitator.routes';

const router = Router();

const routes = [recitatorRoutes];
routes.forEach((route) => router.use('/v1', route));

export { router };
