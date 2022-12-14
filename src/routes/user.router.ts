import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { errorHandler } from '../middlewares/errorHandler';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/verifyToken';

const router: Router = Router();
export const userServiceRouter = (app: Router) => {
	const userController: UserController = new UserController();

	app.use('/user', router);

	router.post('/', errorHandler(userController.createUser));

	router.post('/token', errorHandler(userController.login));

	router.get('/refresh', verifyRefreshTokenMiddleware, errorHandler(userController.refreshToken));

	router.get('/:id', errorHandler(userController.showUserInfo));

	router.patch('/mypage', verifyTokenMiddleware, errorHandler(userController.updateInfo));

	router.delete('/', verifyTokenMiddleware, errorHandler(userController.cancelMember));
};
