import { Router as ExpressRouter, type Request, type Response } from 'express';
import Router from './Router';

class MainRouter extends Router {
  private readonly router: ExpressRouter;
  private readonly routeName: string;
  
  constructor() {
    super();
    this.router = ExpressRouter();
    this.routeName = '/';

    this.registerRoutes();
  }

  public registerRoutes(): void {
    // Register all of the routes here ↓
    this.router.get('/', (req: Request, res: Response) => {
      res.json({
        status: 'ok',
        message: 'Hello World2!',
      });
    });
  }

  public getRouteName(): string {
    return this.routeName;
  }

  public getRouter(): ExpressRouter {
    return this.router;
  }
}

export default MainRouter;
