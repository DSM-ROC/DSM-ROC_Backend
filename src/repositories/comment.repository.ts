import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Comment } from '../entity/comment';
import { User } from '../entity/user';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
	static getQueryRepository() {
		return getCustomRepository(CommentRepository);
	}

	async createComment(postId: number, text: string, user: User) {
		const newComment = new Comment();

		newComment.text = text;
		newComment.postId = postId;
		newComment.writer = user.id;

		return this.save(newComment);
	}

	async updateComment(commentId: number, text: string, user: User) {
		return this.update(
			{
				id: commentId,
				writer: user.id,
			},
			{
				text,
			},
		);
	}

	async getAllComment(postId: number) {
		return this.createQueryBuilder('comment')
			.select('comment.id')
			.addSelect('comment.text')
			.addSelect('comment.createdAt')
			.addSelect('comment.updatedAt')
			.addSelect('user.nickname')
			.innerJoin('comment.user', 'user')
			.innerJoin('comment.post', 'post')
			.where('comment.postId = :postId', { postId })
			.getMany();
	}

	async checkComment(postId: number, commentId: number) {
		return this.findOne({ id: commentId, postId });
	}
}
