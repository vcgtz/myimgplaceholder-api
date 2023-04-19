import { type Request, type Response } from 'express';
import axios, { type AxiosResponse } from 'axios';

class UnplashImageController {
  public async random(req: Request, res: Response): Promise<Response> {
    const url: string = `${process.env.UNPLASH_API_URL}/photos/random?client_id=${process.env.UNPLASH_ACCESS_KEY}`;
    const unplashResponse: AxiosResponse = await axios.get(url);

    if (unplashResponse.status !== 200) {
      return res.json({
        status: 'error',
        errors: ['An unexpected has ocurred. Try it again in a few seconds.'],
      });
    }

    return res.json({
      status: 'ok',
      image: unplashResponse.data
    });
  }
}

export default UnplashImageController;
