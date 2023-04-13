import express from 'express';

class Server {
  private readonly app: express.Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  }

  public run(): void {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.json({
        message: 'Hello World!',
      });
    });

    this.app.listen(this.port, () => {
      console.log(`Running application on port: ${this.port}`);
      console.log(`Environment: ${process.env.NODE_ENV ?? 'development'}`);
    });
  }
}

export default Server;
