import { Router } from 'express';
import { userServiceRouter } from './user.router';

export const dsmlocRouter = () => {
  const app = Router();

  userServiceRouter(app);

  return app;
};
