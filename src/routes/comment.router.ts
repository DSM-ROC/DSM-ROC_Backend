import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
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
	router.patch(
		'/:challenge_id/post/:post_id/comment/:comment_id',
		verifyTokenMiddleware,
		errorHandler(commentController.updateComment),
	);
	router.delete(
		'/:challenge_id/post/:post_id/comment/:comment_id',
		verifyTokenMiddleware,
		errorHandler(commentController.deleteComment),
	);
};
