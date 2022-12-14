import { User } from "../entity/user";
import { JoinRepository } from "../repositories/join.repository";
import { ReviewRepository } from "../repositories/review.repository";
import { ForbiddenError } from "../shared/exception";

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
}