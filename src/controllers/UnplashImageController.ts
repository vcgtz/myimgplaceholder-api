import { type Request, type Response } from 'express';
import axios, { type AxiosResponse } from 'axios';
import type Image from '../interfaces/Image';

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

    const image: Image = {
      width: unplashResponse.data.width,
      height: unplashResponse.data.height,
      color: unplashResponse.data.color,
      description: unplashResponse.data.description,
      url: unplashResponse.data.urls.raw,
      urlThumb: unplashResponse.data.urls.thumb,
      credit: `Photo by ${unplashResponse.data.user.name} on Unsplash`
    };

    return res.json({
      status: 'ok',
      image
    });
  }
}

export default UnplashImageController;
