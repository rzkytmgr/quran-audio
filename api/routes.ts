import { NextFunction, Request, Response, Router } from 'express';
import { ErrorResponseHandler } from '@/helper/ErrorResponseHandler';

import * as audioTimeConverter from './audioTimeConverter';


const router = Router();
const routes = [
  audioTimeConverter
];

for (const route of routes)
  router[route.method](route.path, route.controller);

router.use((err: ErrorResponseHandler, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.code).json(err);
});

router.all('*', (req: Request, res: Response) => {
  return res.status(404).json(new ErrorResponseHandler(404, 'Not Found', 'You\'re lost, read the following docs https://github.com/rzkytmgr/quran-recitation-cutter'));
});

export { router as Routes };