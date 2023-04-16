import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import RouterManager from './routes/RouterManager';

class Server {
  private readonly app: express.Application;
  private readonly port: number;
  private readonly router: RouterManager;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.router = RouterManager.getInstance();
  }

  private async setConfig(): Promise<void> {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.use('/', await this.router.getRouter());
  }

  public async run(): Promise<void> {
    await this.setConfig();

    this.app.listen(this.port, () => {
      console.log(`Running application on port: ${this.port}`);
      console.log(`Environment: ${process.env.NODE_ENV ?? 'development'}`);
    });
  }
}

export default Server;
