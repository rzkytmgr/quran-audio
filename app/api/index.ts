import { Router, Errback, Request, Response, NextFunction } from 'express';
import { router as routesV1 } from '@/api/v1';

const router = Router();

const routes = [routesV1];
routes.forEach((route) => router.use(route));

router.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.status(500).json({
    message: 'Internal Server Error',
  });
});

export { router };
