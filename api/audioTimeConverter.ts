import { Request, Response, NextFunction } from 'express';
import { IRouteMethod } from '@/interfaces';
import { ResponseHandler } from '@/helper/ResponseHandler';
import { ErrorResponseHandler } from '@/helper/ErrorResponseHandler';

export const path = '/convert';
export const method: IRouteMethod = IRouteMethod.GET;
export const controller = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sequence, time } = req.query;

    if (!sequence) {
      throw new ErrorResponseHandler(400, 'Need `sequence` parameter');
    }
    
    if (!time) {
      throw new ErrorResponseHandler(400, 'Need `time` parameter');
    }

    if (isNaN(Number(sequence))) {
      throw new ErrorResponseHandler(400, '`sequence` parameter should a number');
    }
    
    const pattern = /([0-9]{1,}.[0-9]{1,}-[0-9]{1,}.[0-9]{1,},?){1,}/;
    const timePattern = time.toString().trim();
    if (!timePattern.toString().match(pattern)) {
      throw new ErrorResponseHandler(400, '`time` parameter should follow the pattern');
    }
    
    return res.status(200).json(new ResponseHandler(200, 'Successfully', {
      id: Number(sequence),
      schema: timePattern.split(',').map((t, i) => ({
        i: i + 1,
        s: t.split('-')[0],
        e: t.split('-')[1], 
      }))
    }));
  } catch (error) {
    next(error);
  }
};
