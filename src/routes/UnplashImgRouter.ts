import { Router as ExpressRouter } from 'express';
import Router from './Router';
import UnplashImageController from '../controllers/UnplashImageController';

class PlaceholderImgRouter extends Router {
  private readonly router: ExpressRouter;
  private readonly routeName: string;
  private readonly controller: UnplashImageController;
  
  constructor() {
    super();
    this.router = ExpressRouter();
    this.routeName = '/unplash';
    this.controller = new UnplashImageController();

    this.registerRoutes();
  }

  public registerRoutes(): void {
    // Register all of the routes here ↓
    this.router.get('/random', this.controller.random.bind(this.controller));
  }

  public getRouteName(): string {
    return this.routeName;
  }

  public getRouter(): ExpressRouter {
    return this.router;
  }
}

export default PlaceholderImgRouter;
