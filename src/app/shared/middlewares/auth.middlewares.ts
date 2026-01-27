import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@app/users/infra/services/token.services';

// TO-DO Hacer compartido este módulo
const jwt = new JwtService();

interface ExtendedReq extends Request {
  user?: string | null;
}

export const ExpressAuthMiddleware = async (
  req: ExtendedReq,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ success: false, message: 'Not auth headers' });
  const [type, token] = authHeader.split(' ');
  if (!token)
    return res.status(401).json({ success: false, message: 'Not auth token' });
  const payload = jwt.decodeToken(token);
  req.user = payload.sub;
  next();
};
