import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { PostController } from '../controllers/post.controller';
import { errorHandler } from '../middlewares/errorHandler';
import { verifyTokenMiddleware } from '../middlewares/verifyToken';

const router: Router = Router();
export const commentServiceRouter = (app: Router) => {
	const commentController: CommentController = new CommentController();

	app.use('/challenge', router);

	router.post(
		'/:challenge_id/post/:post_id/comment',
		verifyTokenMiddleware,
		errorHandler(commentController.createComment),
	);
	router.get(
		'/:challenge_id/post/:post_id/comment',
		verifyTokenMiddleware,
		errorHandler(commentController.getAllCommnet),
	);
};
