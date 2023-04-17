import { Router as ExpressRouter } from 'express';
import Router from './Router';
import PlaceholderImgController from '../controllers/PlaceholderImgController';

class PlaceholderImgRouter extends Router {
  private readonly router: ExpressRouter;
  private readonly routeName: string;
  private readonly controller: PlaceholderImgController;
  
  constructor() {
    super();
    this.router = ExpressRouter();
    this.routeName = '/placeholder';
    this.controller = new PlaceholderImgController();

    this.registerRoutes();
  }

  public registerRoutes(): void {
    // Register all of the routes here ↓
    this.router.get('/', this.controller.index.bind(this.controller));
  }

  public getRouteName(): string {
    return this.routeName;
  }

  public getRouter(): ExpressRouter {
    return this.router;
  }
}

export default PlaceholderImgRouter;
