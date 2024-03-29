import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Review } from '../entity/review';
import { User } from '../entity/user';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
	static getQueryRepository() {
		return getCustomRepository(ReviewRepository);
	}

	async createReview(challengeId: number, text: string, user: User): Promise<Review> {
		const newReview = new Review();

		newReview.text = text;
		newReview.challengeId = challengeId;
		newReview.userId = user.id;

		return this.save(newReview);
	}

	async updateReview(reviewId: number, text: string, user: User) {
		return await this.update(
			{
				id: reviewId,
				userId: user.id,
			},
			{
				text,
			},
		);
	}

	async deleteReview(reviewId: number, user: User) {
		return await this.delete({
			id: reviewId,
			userId: user.id,
		});
	}

	async checkReview(challengeId: number, reviewId: number): Promise<Review> {
		return this.findOne({ id: reviewId, challengeId });
	}

	async getOneReview(challengeId: number, reviewId: number): Promise<Review> {
		return this.createQueryBuilder('review')
			.select('review.id')
			.addSelect('challenge.name')
			.addSelect('review.text')
			.addSelect('user.id')
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
			.addSelect('user.id')
			.addSelect('user.nickname')
			.addSelect('review.createdAt')
			.addSelect('review.updatedAt')
			.innerJoin('review.user', 'user')
			.innerJoin('review.challenge', 'challenge')
			.where('review.challengeId = :challengeId', { challengeId })
			.getMany();
	}

	async getMyReview(user: User): Promise<Review> {
		return this.findOne({ userId: user.id });
	}
}
