import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { errorHandler } from "../middlewares/errorHandler";
import { verifyTokenMiddleware } from "../middlewares/verifyToken";

const router: Router = Router();
export const  reviewServiceRouter = (app: Router) => {
    const reviewController: ReviewController = new ReviewController();

    app.use('/', router);

    router.post('/:challenge_id/review', verifyTokenMiddleware, errorHandler(reviewController.createReview));
}