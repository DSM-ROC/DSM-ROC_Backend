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

	async getOneReview(reviewId: number) {
		return this.findOne({ id: reviewId });
	}

	async getAllReview(challengeId: number) {
		return this.find({ challengeId });
	}

	async getMyReview(user: User) {
		return this.findOne({ userId: user.id });
	}
}
