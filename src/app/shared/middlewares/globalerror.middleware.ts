import { Next, Req, Res } from '@lib/interfaces/adapters/express.types';

export const ExpressErrorMiddleware = (
  error: Error,
  req: Req,
  res: Res,
  next: Next,
) => {
  console.log(error);
  if (error instanceof Error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: error?.message });
  }

  return res.status(500).json({ success: false, error });
};
