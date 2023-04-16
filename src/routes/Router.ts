import { type Router as ExpressRouter } from 'express';

abstract class Router {
  abstract registerRoutes(): void;
  abstract getRouteName(): string;
  abstract getRouter(): ExpressRouter;
}

export default Router;
