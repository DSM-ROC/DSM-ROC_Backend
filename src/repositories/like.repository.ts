import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Like } from '../entity/like';
import { User } from '../entity/user';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
	static getQueryRepository() {
		return getCustomRepository(LikeRepository);
	}

	async createLike(postId: number, user: User) {
		const newLike = new Like();

		newLike.postId = postId;
		newLike.userId = user.id;

		return this.save(newLike);
	}

	async deleteLike(postId: number, user: User) {
		return this.delete({ postId, userId: user.id });
	}

	async DeleteAllLike(postId: number) {
		return this.delete({ postId });
	}

	async checkLike(postId: number, user: User) {
		return this.findOne({ postId, userId: user.id });
	}
}