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
    return await this.findOne({ id: reviewId, userId: user.id });
  }

  async getOneReview(reviewId: number) {
    return await this.findOne({ id: reviewId });
  }

  async getMyReview(user: User) {
    return await this.findOne({ userId: user.id });
  }

  async getAllReview(challengeId: number) {
    return await this.findOne({ challengeId });
  }

  async getOneMonthReview(challengeId: number, date: Date) {
    return this.createQueryBuilder('review')
      .select('review.uesrId')
      .addSelect('review.challengeId')
      .addSelect('review.text')
      .addSelect('user.nickname')
      .addSelect('review.createdAt')
      .addSelect('review.updatedAt')
      .innerJoin('review.user', 'user')
      .where('MONTH(review.createdAt) == MONTH(:date)', { date })
      .andWhere('review.challengeId = :challengeId', { challengeId })
      .getMany();
  }

  async getDate(challengeId: number, user: User) {
    return this.createQueryBuilder('review')
    .select('review.userId')
    .addSelect('review.challengeId')
    .addSelect(`DATE_FORMAT(review.createdAt, '%Y-%m-%d') AS review.createdAt`)
    .addSelect('review.updatedAt')
    .addSelect('user.nickname')
    .addSelect('review.text')
    .innerJoin('review.user', 'user')
    .where('review.userId == :userId AND review.challengeId == :challengeId', 
      { userId : user.id, challengeId })
    .getMany()
  }
}
