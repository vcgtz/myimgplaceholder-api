import { type Request, type Response, type NextFunction } from 'express';

export const validateParams = (req: Request, res: Response, next: NextFunction): void  => {
  const { query, orientation } = req.query as { query: string, orientation: string };
  const errors: string[] = [];

  if (!query) {
    errors.push('The query parameter is required.');
  }

  if (orientation && !['landscape', 'portrait', 'squarish'].includes(orientation)) {
    errors.push('The orientation parameter must be one of the following values: [landscape, portrait, squarish].');
  }

  if (errors.length) {
    res.status(400).json({
      status: 'error',
      errors: errors.map(error => ({ message: error })),
    });
  } else {
    next();
  }
};
