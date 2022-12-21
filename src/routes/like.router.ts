import { Router } from 'express';
import { LikeController } from '../controllers/like.controller';
import { errorHandler } from '../middlewares/errorHandler';
import { verifyTokenMiddleware } from '../middlewares/verifyToken';

const router: Router = Router();
export const likeServiceRouter = (app: Router) => {
	const likeController: LikeController = new LikeController();

	app.use('/challenge', router);

	router.post(
		'/:challenge_id/post/:post_id/like',
		verifyTokenMiddleware,
		errorHandler(likeController.postLike),
	);
};
