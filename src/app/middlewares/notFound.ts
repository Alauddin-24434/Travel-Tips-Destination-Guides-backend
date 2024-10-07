
import { Request, Response, NextFunction, RequestHandler } from 'express';
import httpStatus from 'http-status';

// Define the notFound handler explicitly as a RequestHandler
const notFound: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  });
};

export default notFound;
