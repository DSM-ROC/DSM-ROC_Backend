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
}
