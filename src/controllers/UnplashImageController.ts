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

    return res.json({
      status: 'ok',
      image: this.getImage(unplashResponse),
    });
  }

  private getImage(response: AxiosResponse): Image {
    const sizes: ImageSize[] = [];

    for (const size in response.data.urls) {
      sizes.push({
        size: size === 'raw' ? 'original' : size,
        url: response.data.urls[size]
      });
    }

    const image: Image = {
      width: response.data.width,
      height: response.data.height,
      color: response.data.color,
      description: response.data.description,
      credit: `Photo by ${response.data.user.name} on Unsplash`,
      sizes
    };

    return image;
  }
}

export default UnplashImageController;
