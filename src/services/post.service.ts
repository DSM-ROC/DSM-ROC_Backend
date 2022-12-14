import { User } from '../entity/user';
import { ChallengeRepository } from '../repositories/challenge.repository';
import { CommentRepository } from '../repositories/comment.repository';
import { JoinRepository } from '../repositories/join.repository';
import { LikeRepository } from '../repositories/like.repository';
import { PostRepository } from '../repositories/post.repository';
import { PostInfo } from '../shared/DataTransferObject';
import { ForbiddenError, NotFoundError } from '../shared/exception';

export class PostService {
	constructor(
		private postRepository: PostRepository,
		private challengeRepository: ChallengeRepository,
		private joinRepository: JoinRepository,
		private commentRepository: CommentRepository,
		private likeRepository: LikeRepository,
	) {}

	async createPost(challengeId: number, postInfo: PostInfo, user: User) {
		await this.checkChallenge(challengeId, user);
		return this.postRepository.createPost(challengeId, postInfo, user);
	}

	async updatePost(challengeId: number, postId: number, postInfo: PostInfo, user: User) {
		await this.checkChallenge(challengeId, user);
		await this.checkPost(challengeId, postId, user);

		return this.postRepository.updatePost(postId, postInfo, user);
	}

	async deletePost(challengeId: number, postId: number, user: User) {
		await this.checkChallenge(challengeId, user);
		await this.checkPost(challengeId, postId, user);

		await this.commentRepository.deleteAllComment(postId);
		await this.likeRepository.deleteAllLike(postId);

		return this.postRepository.deletePost(postId, user);
	}

	async getAllPost(challengeId: number, user: User) {
		await this.checkChallenge(challengeId, user);

		return this.postRepository.getAllPost(challengeId);
	}

	async getOnePost(challengeId: number, postId: number, user: User) {
		const post = await this.postRepository.getOnePost(challengeId, postId);

		await this.checkChallenge(challengeId, user);

		if (!post) throw new NotFoundError('Post Not Found');
		return post;
	}

	async checkChallenge(challengeId: number, user: User) {
		if (!(await this.challengeRepository.getOneChallenge(challengeId)))
			throw new NotFoundError('Challenge Not Found');
		if (!(await this.joinRepository.checkJoinChallenge(challengeId, user)))
			throw new ForbiddenError('Challenge Not Join');
	}

	async checkPost(challengeId: number, postId: number, user: User) {
		const post = await this.postRepository.checkPost(challengeId, postId);

		if (!post) throw new NotFoundError('Post Not Found');
		else if (post.writer !== user.id)
			throw new ForbiddenError('Forbidden to edit other users posts');
	}
}
