import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { errorHandler } from '../middlewares/errorHandler';
import { verifyTokenMiddleware } from '../middlewares/verifyToken';

const router: Router = Router();
export const postServiceRouter = (app: Router) => {
	const postController: PostController = new PostController();

	app.use('/challenge', router);

	router.post(
		'/:challenge_id/post',
		verifyTokenMiddleware,
		errorHandler(postController.createPost),
	);
};
