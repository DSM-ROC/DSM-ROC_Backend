import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { errorHandler } from '../middlewares/errorHandler';
import { verifyTokenMiddleware } from '../middlewares/verifyToken';

const router: Router = Router();
export const reviewServiceRouter = (app: Router) => {
	const reviewController: ReviewController = new ReviewController();

	app.use('/challenge', router);

	router.post(
		'/:challenge_id/review',
		verifyTokenMiddleware,
		errorHandler(reviewController.createReview),
	);
	router.patch(
		'/:challenge_id/review/:review_id',
		verifyTokenMiddleware,
		errorHandler(reviewController.updateReview),
	);
	router.delete(
		'/:challenge_id/review/:review_id',
		verifyTokenMiddleware,
		errorHandler(reviewController.deleteReview),
	);
	router.get(
		'/:challenge_id/review',
		verifyTokenMiddleware,
		errorHandler(reviewController.getAllReview),
	);

	router.get(
		'/:challenge_id/review/:review_id',
		verifyTokenMiddleware,
		errorHandler(reviewController.getOneReview),
	);
};
