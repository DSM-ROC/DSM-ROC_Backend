import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Comment } from '../entity/comment';
import { User } from '../entity/user';
import { CommentInfo, CommentUpdateInfo } from '../shared/DataTransferObject';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
	static getQueryRepository() {
		return getCustomRepository(CommentRepository);
	}

	async createComment(commentInfo: CommentInfo, user: User): Promise<Comment> {
		const newComment = new Comment();

		newComment.text = commentInfo.text;
		newComment.postId = commentInfo.postId;
		newComment.writer = user.id;

		return this.save(newComment);
	}

	async updateComment(commentUpdateInfo: CommentUpdateInfo, user: User): Promise<Comment> {
		const comment = await this.findOne({ id: commentUpdateInfo.id, writer: user.id });

		this.merge(comment, commentUpdateInfo);
		return this.save(comment);
	}

	async deleteComment(commentId: number, user: User) {
		return this.delete({
			id: commentId,
			writer: user.id,
		});
	}

	async checkComment(postId: number, commentId: number): Promise<Comment> {
		return this.findOne({ id: commentId, postId });
	}

	async deleteAllComment(postId: number) {
		return this.delete({ postId });
	}
}
