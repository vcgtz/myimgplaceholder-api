import { type Request, type Response } from 'express';
import sharp from 'sharp';
import type Image from '../interfaces/Image';

class PlaceholderImgageController {
  public index(req: Request, res: Response): Response {
    const { width, height, color = '333333' }: { width: string, height: string, color: string }
      = req.query as { width: string, height: string, color: string };

    const imageInfo: string[][] = [
      ['width', width],
      ['height', height],
      ['color', color],
    ];
    const urlParams = new URLSearchParams(imageInfo);
    const urlParamsBase64 = Buffer.from(urlParams.toString()).toString('base64');
    const image: Image = {
      width: +width,
      heigth: +height,
      color: `#${color}`,
      description: `${width} × ${height}`,
      url: `${process.env.URL_BASE}/placeholder/image/${urlParamsBase64}`,
    };
    
    return res.json({
      status: 'ok',
      image
    });
  }

  public render(req: Request, res: Response): void {
    const imageInfo: string = Buffer.from(req.params.imageInfo, 'base64').toString('ascii');
    const urlParams = new URLSearchParams(imageInfo);

    const imgTemplate: string = this.getSVGTemplate(
      +(urlParams.get('width') as string),
      +(urlParams.get('height') as string),
      urlParams.get('color') as string
    );

    sharp(Buffer.from(imgTemplate))
      .png()
      .toBuffer()
      .then((buffer: Buffer) => {
        res.set('Content-Type', 'image/png');
        res.send(buffer);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error processing your request.');
      });
  }

  private getSVGTemplate(width: number, height: number, color: string): string {
    return `
      <svg width="${width}" height="${height}">
        <style>
          .title { fill: #001; font-size: 2em; font-family: monospace; font-weight: lighter;}
        </style>
        <rect width="100%" height="100%" fill="#${color}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="title">${width} × ${height}</text>
      </svg>
    `;
  }
}

export default PlaceholderImgageController;
