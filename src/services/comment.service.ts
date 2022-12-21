import { User } from '../entity/user';
import { ChallengeRepository } from '../repositories/challenge.repository';
import { CommentRepository } from '../repositories/comment.repository';
import { JoinRepository } from '../repositories/join.repository';
import { PostRepository } from '../repositories/post.repository';
import { ForbiddenError, NotFoundError } from '../shared/exception';

export class CommentService {
	constructor(
		private commentRepository: CommentRepository,
		private challengeRepository: ChallengeRepository,
		private joinRepository: JoinRepository,
		private postRepository: PostRepository,
	) {}

	async createComment(challengeId: number, postId: number, text: string, user: User) {
		await this.checkChallenge(challengeId, user);
		await this.checkPost(challengeId, postId);

		return this.commentRepository.createComment(postId, text, user);
	}

	async updateComment(
		challengeId: number,
		postId: number,
		commentId: number,
		text: string,
		user: User,
	) {
		await this.checkChallenge(challengeId, user);
		await this.checkPost(challengeId, postId);
		await this.checkComment(postId, commentId, user);

		return this.commentRepository.updateComment(commentId, text, user);
	}

	async deleteComment(challengeId: number, postId: number, commentId: number, user: User) {
		await this.checkChallenge(challengeId, user);
		await this.checkPost(challengeId, postId);
		await this.checkComment(postId, commentId, user);

		return this.commentRepository.deleteComment(commentId, user);
	}

	async checkChallenge(challengeId: number, user: User) {
		if (!(await this.challengeRepository.getOneChallenge(challengeId))) throw new NotFoundError();
		if (!(await this.joinRepository.checkJoinChallenge(challengeId, user)))
			throw new ForbiddenError();
	}

	async checkPost(challengeId: number, postId: number) {
		if (!(await this.postRepository.checkPost(challengeId, postId))) throw new NotFoundError();
	}

	async checkComment(postId: number, commentId: number, user: User) {
		const comment = await this.commentRepository.checkComment(postId, commentId);

		if (!comment) throw new NotFoundError();
		if (comment.writer !== user.id) throw new ForbiddenError();
	}
}
