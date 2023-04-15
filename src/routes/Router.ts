import { Router as ExpressRouter, type Request, type Response } from 'express';

class Router {
  private static instance: Router | null = null;
  private readonly router: ExpressRouter;
  
  private constructor() {
    this.router = ExpressRouter();

    this.registerRouter();
  }

  private registerRouter(): void {
    // Register all routes here
    this.router.use('/', (req: Request, res: Response) => {
      res.json({
        message: 'Hello World!',
      });
    });
  }

  public getRouter(): ExpressRouter {
    return this.router;
  }

  public static getInstance(): Router {
    if (!this.instance) {
      this.instance = new Router();
    }

    return this.instance;
  }
};

export default Router;
