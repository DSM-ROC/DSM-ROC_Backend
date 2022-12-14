import { JoinRepository } from "../repositories/join.repository";
import { ReviewRepository } from "../repositories/review.repository";
import { ReviewService } from "../services/review.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";

export class ReviewController { 
    private reviewService: ReviewService = new ReviewService(
        ReviewRepository.getQueryRepository(),
        JoinRepository.getQueryRepository()
    );

    public createReview: BusinessLogic = async(req, res, next) => {
        const review = req.body.review;
        const challengeId = Number(req.params.challenge_id);
        const user = req.decoded;

        const response = await this.reviewService.createReview(challengeId, review, user);
        
        return res.status(202).json(response);
    }

    public updateReview: BusinessLogic = async(req, res, next) => {
        const review = req.body.review;
        const challengeId = Number(req.params.challenge_id);
        const reviewId = Number(req.params.review_id);
        const user = req.decoded;

        await this.reviewService.updateReview(challengeId, reviewId, review, user);

        return res.status(200).json({ message : 'update success' });
    }

    public deleteReview: BusinessLogic = async(req, res, next) => {
        const challengeId = Number(req.params.challenge_id);
        const reviewId = Number(req.params.review_id);
        const user = req.decoded;

        await this.reviewService.deleteReview(challengeId, reviewId, user);

        return res.status(200).json({ message : 'delete success' });
    }
}