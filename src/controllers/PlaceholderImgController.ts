import { type Request, type Response } from 'express';
import sharp from 'sharp';

interface PlaceholderImgInformation {
  width: number;
  height: number;
  color: string;
};

class PlaceholderImgController {
  public index(req: Request, res: Response): void {
    const imgDescription: PlaceholderImgInformation = {
      width: +(req.query.width as string),
      height: +(req.query.height as string),
      color: req.query.color as string ?? '333333',
    };

    const imgTemplate: string = this.getSVGTemplate(imgDescription);

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

  public getSVGTemplate(img: PlaceholderImgInformation): string {
    return `
      <svg width="${img.width}" height="${img.height}">
        <style>
          .title { fill: #001; font-size: 2em; font-family: monospace; font-weight: lighter;}
        </style>
        <rect width="100%" height="100%" fill="#${img.color}" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="title">${img.width} x ${img.height}</text>
      </svg>
    `;
  }
}

export default PlaceholderImgController;
