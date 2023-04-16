import fs from 'fs/promises';
import { Router as ExpressRouter } from 'express';
import type Router from './Router';

class RouterManager {
  private static instance: RouterManager | null = null;
  private readonly router: ExpressRouter;
  private readonly ommitedFiles: string[];
  
  private constructor() {
    this.router = ExpressRouter();
    this.ommitedFiles = ['RouterManager', 'Router'];
  }

  private async importRouterFiles(): Promise<void> {
    // Import dynamically routers files
    try {
      const files: string[] = (await fs.readdir(__dirname))
        .map((file: string) => {
          return file.split('.')[0];
        })
        .filter((file: string) => {
          return !this.ommitedFiles.includes(file);
        });
      const uniqueFiles: string[] = [...new Set(files)];

      for (let i: number = 0; i < uniqueFiles.length; i++) {
        if (!this.ommitedFiles.includes(uniqueFiles[i])) {
          // eslint-disable-next-line
          const router: Router = new (await import(`./${uniqueFiles[i]}`)).default;
          this.router.use(router.getRouteName(), router.getRouter());
        }
    }
    } catch (error) {
      console.error(error);
    }
  }

  public async getRouter(): Promise<ExpressRouter> {
    await this.importRouterFiles();
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
