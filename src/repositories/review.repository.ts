import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Review } from '../entity/review';
import { User } from '../entity/user';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
	static getQueryRepository() {
		return getCustomRepository(ReviewRepository);
	}

	async createReview(challengeId: number, review: string, user: User) {
		const newReview = new Review();

		newReview.text = review;
		newReview.challengeId = challengeId;
		newReview.userId = user.id;

		return this.save(newReview);
	}

	async updateReview(reviewId: number, review: string, user: User) {
		const newReview = await this.update(
			{
				id: reviewId,
				userId: user.id,
			},
			{
				text: review,
			},
		);

		return newReview;
	}

	async deleteReview(reviewId: number, user: User) {
		const review = await this.delete({
			id: reviewId,
			userId: user.id,
		});

		return review;
	}

	async checkReview(reviewId: number, user: User) {
		return this.findOne({ id: reviewId, userId: user.id });
	}

	async getOneReview(challengeId: number, reviewId: number) {
		return this.createQueryBuilder('review')
			.select('review.id')
			.addSelect('challenge.name')
			.addSelect('review.text')
			.addSelect('user.nickname')
			.addSelect('review.createdAt')
			.addSelect('review.updatedAt')
			.innerJoin('review.user', 'user')
			.innerJoin('review.challenge', 'challenge')
			.where('review.id = :reviewId AND review.challengeId = :challengeId', {
				reviewId,
				challengeId,
			})
			.getOne();
	}

	async getAllReview(challengeId: number) {
		return this.createQueryBuilder('review')
			.select('review.id')
			.addSelect('challenge.name')
			.addSelect('review.text')
			.addSelect('user.nickname')
			.addSelect('review.createdAt')
			.addSelect('review.updatedAt')
			.innerJoin('review.user', 'user')
			.innerJoin('review.challenge', 'challenge')
			.where('review.challengeId = :challengeId', { challengeId })
			.getMany();
	}

	async getMyReview(user: User) {
		return this.findOne({ userId: user.id });
	}
}
