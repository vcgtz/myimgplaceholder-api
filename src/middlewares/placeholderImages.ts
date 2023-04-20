import { type Request, type Response, type NextFunction } from 'express';

export const validateParams = (req: Request, res: Response, next: NextFunction): void  => {
  const { width, height } = req.query as { width: string, height: string, color: string };
  const errors: string[] = [];

  if (!width) {
    errors.push('The width parameter is required.');
  }

  if (!height) {
    errors.push('The height parameters is required.');
  }

  if (width && isNaN(+width)) {
    errors.push('The width parameter must be a number.');
  }

  if (height && isNaN(+height)) {
    errors.push('The width parameter must be a number.');
  }

  if (height && +height > 1200) {
    errors.push('The height parameter must be less or equal than 1200px.');
  }

  if (width && +width > 1200) {
    errors.push('The height parameter must be less or equal than 1200px.');
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

export const validateBase64Params = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const imageInfo: string = Buffer.from(req.params.imageInfo, 'base64').toString('ascii');
    const urlParams = new URLSearchParams(imageInfo);

    if (!urlParams.has('width') || !urlParams.has('height') || !urlParams.has('color')) {
      res.status(400).send('The url is invalid.');
    } else {
      next();
    }
  } catch (err) {
    res.status(400).send('The url is invalid.');
  }
};
