import { type Request, type Response } from 'express';
import axios, { type AxiosResponse } from 'axios';
import { type Image, type ImageSize, type ImageUnplashResponse } from '../interfaces/Image';

class UnplashImageController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { query, orientation = 'landscape' }: { query: string, orientation: string } =
      req.query as { query: string, orientation: string };
    const url: string = `${process.env.UNPLASH_API_URL}/search/photos?client_id=${process.env.UNPLASH_ACCESS_KEY}&query=${query}&orientation=${orientation}`;
    const unplashResponse: AxiosResponse = await axios.get(url);

    if (unplashResponse.status !== 200) {
      return res.json({
        status: 'error',
        errors: ['An unexpected has ocurred. Try it again in a few seconds.'],
      });
    }

    const images: Image[] = this.getImages(unplashResponse);

    return res.json({
      status: 'ok',
      images,
    });
  }

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
      image: this.getImage(unplashResponse.data),
    });
  }

  private getImage(imageResponse: ImageUnplashResponse): Image {
    const sizes: ImageSize[] = [];

    for (const size in imageResponse.urls) {
      sizes.push({
        size: size === 'raw' ? 'original' : size,
        url: imageResponse.urls[size]
      });
    }

    return {
      width: +imageResponse.width,
      height: +imageResponse.height,
      color: imageResponse.color as string,
      description: imageResponse.description as string,
      credit: `Photo by ${imageResponse.user.name} on Unsplash`,
      sizes
    };
  }

  private getImages(response: AxiosResponse): Image[] {
    const images: Image[] = response.data.results.map((image: ImageUnplashResponse) => this.getImage(image));

    return images;
  }
}

export default UnplashImageController;
