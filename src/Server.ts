import express from 'express';

class Server {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
  }

  public run(): void {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.json({
        message: 'Hello World!',
      });
    });

    this.app.listen(3000, () => {
      console.log('Running application on port: 3000');
    });
  }
}

export default Server;
