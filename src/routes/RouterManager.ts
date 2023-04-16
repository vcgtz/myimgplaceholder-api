import { Router as ExpressRouter, type Request, type Response } from 'express';

class RouterManager {
  private static instance: RouterManager | null = null;
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

  public static getInstance(): RouterManager {
    if (!this.instance) {
      this.instance = new RouterManager();
    }

    return this.instance;
  }
};

export default RouterManager;
