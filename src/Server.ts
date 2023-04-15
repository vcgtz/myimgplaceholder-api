import express from 'express';
import Router from './routes/Router';

class Server {
  private readonly app: express.Application;
  private readonly port: number;
  private readonly router: Router;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.router = Router.getInstance();
  }

  private setConfig(): void {
    this.app.use('/', this.router.getRouter());
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
