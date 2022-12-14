import { User } from "../entity/user";
import { JoinRepository } from "../repositories/join.repository";
import { ReviewRepository } from "../repositories/review.repository";
import { ForbiddenError, NotFoundError } from "../shared/exception";

export class ReviewService {
    constructor(
        private reviewRepository: ReviewRepository,
        private joinRepository: JoinRepository
    ) {}

    async createReview(challengeId: number, review: string, user: User) {
        const check = await this.joinRepository.checkChallenge(challengeId, user);

        if(check) return this.reviewRepository.createReview(challengeId, review, user);
        else throw new ForbiddenError;
    }

    async updateReview(challengeId: number, reviewId: number, review: string, user: User) {
        const check = await this.joinRepository.checkChallenge(challengeId, user);

        if(check) {
            if(!await this.reviewRepository.checkReview(reviewId, user)) throw new ForbiddenError;
            if(!await this.reviewRepository.getOneReview(reviewId)) throw new NotFoundError;
            
            return this.reviewRepository.updateReview(reviewId, review, user)
        } else throw new ForbiddenError;
    }

    async deleteReview(challengeId: number, reviewId: number, user: User) {
        const check = await this.joinRepository.checkChallenge(challengeId, user);

        if(check) {
            if(!await this.reviewRepository.checkReview(reviewId, user)) throw new ForbiddenError;
            if(!await this.reviewRepository.getOneReview(reviewId)) throw new NotFoundError;

            return this.reviewRepository.deleteReview(reviewId, user);
        } else throw new ForbiddenError;
    }
}