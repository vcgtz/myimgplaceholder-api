import { type Request, type Response } from 'express';

class PlaceholderImgController {
  public index(req: Request, res: Response): Response {
    return res.json({
      status: 'ok',
      message: 'index',
    });
  }
}

export default PlaceholderImgController;
