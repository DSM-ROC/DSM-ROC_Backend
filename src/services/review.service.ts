import { User } from '../entity/user';
import { ChallengeRepository } from '../repositories/challenge.repository';
import { JoinRepository } from '../repositories/join.repository';
import { ReviewRepository } from '../repositories/review.repository';
import { BadRequestError, ForbiddenError, NotFoundError } from '../shared/exception';

export class ReviewService {
	constructor(
		private reviewRepository: ReviewRepository,
		private joinRepository: JoinRepository,
		private challengeRepository: ChallengeRepository,
	) {}

	async createReview(challengeId: number, review: string, user: User) {
		await this.checkChallenge(challengeId, user);
		await this.checkDate(challengeId);

		return this.reviewRepository.createReview(challengeId, review, user);
	}

	async updateReview(challengeId: number, reviewId: number, review: string, user: User) {
		await this.checkChallenge(challengeId, user);
		await this.checkReview(reviewId, user);

		return this.reviewRepository.updateReview(reviewId, review, user);
	}

	async deleteReview(challengeId: number, reviewId: number, user: User) {
		await this.checkChallenge(challengeId, user);
		await this.checkReview(reviewId, user);

		return this.reviewRepository.deleteReview(reviewId, user);
	}

	async getAllReview(challengeId: number, user: User) {
		await this.checkChallenge(challengeId, user);

		return this.reviewRepository.getAllReview(challengeId);
	}

	async getOneReview(challengeId: number, reviewId: number, user: User) {
		await this.checkChallenge(challengeId, user);

		if (!(await this.reviewRepository.getOneReview(reviewId))) throw new NotFoundError();

		return this.reviewRepository.getOneReview(reviewId);
	}

	async checkDate(challengeId: number) {
		const Today = new Date();
		const { startDay, endDay } = await this.challengeRepository.getOneChallenge(challengeId);

		const diffStartDate = startDay.getTime() - Today.getTime();
		const diffEndDate = endDay.getTime() - Today.getTime();
		console.log(diffStartDate, diffEndDate);

		if (diffStartDate > 0 || diffEndDate < 0) throw new BadRequestError('진행 중인 챌린지가 아님');
	}

	async checkChallenge(challengeId: number, user: User) {
		if (!(await this.challengeRepository.getOneChallenge(challengeId))) throw new NotFoundError();
		if (!(await this.joinRepository.checkJoinChallenge(challengeId, user)))
			throw new ForbiddenError();
	}

	async checkReview(reviewId: number, user: User) {
		const review = await this.reviewRepository.getOneReview(reviewId);

		if (!review) throw new NotFoundError();
		else if (review.userId != user.id) throw new ForbiddenError();
	}
}
