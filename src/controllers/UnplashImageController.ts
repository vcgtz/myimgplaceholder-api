import { type Request, type Response } from 'express';
import axios, { type AxiosResponse } from 'axios';
import { type Image, type ImageSize } from '../interfaces/Image';

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

    const sizes: ImageSize[] = [];

    for (const size in unplashResponse.data.urls) {
      sizes.push({
        size: size === 'raw' ? 'original' : size,
        url: unplashResponse.data.urls[size]
      });
    }

    const image: Image = {
      width: unplashResponse.data.width,
      height: unplashResponse.data.height,
      color: unplashResponse.data.color,
      description: unplashResponse.data.description,
      credit: `Photo by ${unplashResponse.data.user.name} on Unsplash`,
      sizes
    };

    return res.json({
      status: 'ok',
      image
    });
  }
}

export default UnplashImageController;
