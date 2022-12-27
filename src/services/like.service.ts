import { User } from '../entity/user';
import { ChallengeRepository } from '../repositories/challenge.repository';
import { JoinRepository } from '../repositories/join.repository';
import { LikeRepository } from '../repositories/like.repository';
import { PostRepository } from '../repositories/post.repository';
import { ForbiddenError, NotFoundError } from '../shared/exception';

export class LikeSerivce {
	constructor(
		private likeRepository: LikeRepository,
		private challengeRepository: ChallengeRepository,
		private joinRepository: JoinRepository,
		private postRepository: PostRepository,
	) {}

	async postLike(challengeId: number, postId: number, user: User): Promise<boolean> {
		await this.checkChallenge(challengeId, user);
		await this.checkPost(challengeId, postId);

		const like = await this.likeRepository.checkLike(postId, user);

		if (like) {
			await this.likeRepository.deleteLike(postId, user);
			return false;
		}
		await this.likeRepository.createLike(postId, user);
		return true;
	}

	async checkChallenge(challengeId: number, user: User) {
		if (!(await this.challengeRepository.getOneChallenge(challengeId)))
			throw new NotFoundError('Challenge Not Found');
		if (!(await this.joinRepository.checkJoinChallenge(challengeId, user)))
			throw new ForbiddenError('Challenge Not Join');
	}

	async checkPost(challengeId: number, postId: number) {
		if (!(await this.postRepository.checkPost(challengeId, postId)))
			throw new NotFoundError('Post Not Found');
	}
}
