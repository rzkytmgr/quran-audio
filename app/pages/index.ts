import { NextFunction, Request, Response, Router } from 'express';
import recitators from '@/data/recitators.json';
import surah from '@/data/surah.json';
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('pages/index', {
    recitators,
    surah,
  });
});

export { router as routes };
