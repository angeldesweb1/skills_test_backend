import { NextFunction, Request, Response } from 'express';

export const ExpressNotFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(404).json({ success: false, message: 'Not found' });
};
