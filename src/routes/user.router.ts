import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { errorHandler } from '../middlewares/errorHandler';
import { verifyRefreshTokenMiddleware } from '../middlewares/verifyToken';

const router: Router = Router();
export const userServiceRouter = (app: Router) => {
  const userController: UserController = new UserController();

  app.use('/users', router);

  router.post('/', errorHandler(userController.createUser));

  router.post('/token', errorHandler(userController.login));

  router.get('/refresh', verifyRefreshTokenMiddleware, errorHandler(userController.refreshToken));

  router.get('/:email', errorHandler(userController.showUserInfo));
};
