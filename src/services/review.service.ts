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
		const challenge = await this.challengeRepository.getOneChallenge(challengeId);
		const check = await this.joinRepository.checkChallenge(challengeId, user);

		if (challenge) {
			if (check) {
				await this.checkDate(challengeId);
				return this.reviewRepository.createReview(challengeId, review, user);
			}
			throw new ForbiddenError();
		}
		throw new NotFoundError();
	}

	async updateReview(challengeId: number, reviewId: number, review: string, user: User) {
		const check = await this.joinRepository.checkChallenge(challengeId, user);

		if (check) {
			if (!(await this.reviewRepository.checkReview(reviewId, user))) throw new ForbiddenError();
			if (!(await this.reviewRepository.getOneReview(challengeId, reviewId)))
				throw new NotFoundError();

			return this.reviewRepository.updateReview(reviewId, review, user);
		}
		throw new ForbiddenError();
	}

	async deleteReview(challengeId: number, reviewId: number, user: User) {
		const check = await this.joinRepository.checkChallenge(challengeId, user);

		if (check) {
			if (!(await this.reviewRepository.checkReview(reviewId, user))) throw new ForbiddenError();
			if (!(await this.reviewRepository.getOneReview(challengeId, reviewId)))
				throw new NotFoundError();

			return this.reviewRepository.deleteReview(reviewId, user);
		}
		throw new ForbiddenError();
	}

	async getAllReview(challengeId: number, user: User) {
		const check = await this.joinRepository.checkChallenge(challengeId, user);

		if (check) return this.reviewRepository.getAllReview(challengeId);
		throw new ForbiddenError();
	}

	async getOneReview(challengeId: number, reviewId: number, user: User) {
		const check = await this.joinRepository.checkChallenge(challengeId, user);

		if (check) {
			if (!(await this.reviewRepository.getOneReview(challengeId, reviewId)))
				throw new NotFoundError();

			return this.reviewRepository.getOneReview(challengeId, reviewId);
		}
		throw new ForbiddenError();
	}

	async checkDate(challengeId: number) {
		const Today = new Date();
		const { startDay } = await this.challengeRepository.getOneChallenge(challengeId);
		const { endDay } = await this.challengeRepository.getOneChallenge(challengeId);

		const diffStartDate = startDay.getTime() - Today.getTime();
		const diffEndDate = endDay.getTime() - Today.getTime();

		if (diffStartDate > 0 || diffEndDate < 0) throw new BadRequestError('진행 중인 챌린지가 아님');
	}
}
