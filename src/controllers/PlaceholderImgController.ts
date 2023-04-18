import { type Request, type Response } from 'express';
import sharp from 'sharp';

class PlaceholderImgController {
  public index(req: Request, res: Response): Response {
    const imageInfo: string[][] = [
      ['width', req.query.width as string],
      ['height', req.query.height as string],
      ['color', req.query.color as string ?? '333333'],
    ];
    const urlParams = new URLSearchParams(imageInfo);
    const urlParamsBase64 = Buffer.from(urlParams.toString()).toString('base64');
    const width: number = +(req.query.width as string);
    const height: number = +(req.query.height as string);
    const color: string = req.query.color as string ?? '333333';

    return res.json({
      status: 'ok',
      image: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        url: `${process.env.URL_BASE}/placeholder/image/${urlParamsBase64}`,
        width,
        height,
        color: `#${color}`,
        description: `${width} × ${height}`,
      }
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

export default PlaceholderImgController;
