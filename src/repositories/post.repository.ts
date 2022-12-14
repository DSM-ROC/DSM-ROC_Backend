import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Post } from '../entity/post';
import { User } from '../entity/user';
import { PostInfo, PostUpdateInfo } from '../shared/DataTransferObject';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
	static getQueryRepository() {
		return getCustomRepository(PostRepository);
	}

	async createPost(postInfo: PostInfo, user: User): Promise<Post> {
		const newPost = new Post();

		newPost.title = postInfo.title;
		newPost.text = postInfo.text;
		newPost.writer = user.id;
		newPost.challengeId = postInfo.challengeId;

		return this.save(newPost);
	}

	async updatePost(postUpdateInfo: PostUpdateInfo, user: User) {
		return this.update(
			{
				id: postUpdateInfo.id,
				writer: user.id,
			},
			{
				title: postUpdateInfo.title,
				text: postUpdateInfo.text,
			},
		);
	}

	async deletePost(postId: number, user: User) {
		return this.delete({
			id: postId,
			writer: user.id,
		});
	}

	async getOnePost(challengeId: number, postId: number): Promise<Post> {
		return this.createQueryBuilder('post')
			.select('post.id')
			.addSelect('post.title')
			.addSelect('post.text')
			.addSelect('post.createdAt')
			.addSelect('post.updatedAt')
			.addSelect('user.nickname')
			.addSelect('challenge.name')
			.addSelect('comment.text')
			.addSelect('comment.createdAt')
			.addSelect('comment.updatedAt')
			.addSelect('writer.nickname')
			.innerJoin('post.user', 'user')
			.innerJoin('post.challenge', 'challenge')
			.leftJoin('post.comment', 'comment')
			.leftJoin('comment.user', 'writer')
			.loadRelationCountAndMap('post.likeCount', 'post.like', 'likeCount')
			.where('post.id = :postId AND post.challengeId = challengeId', {
				postId,
				challengeId,
			})
			.getOne();
	}

	async getAllPost(challengeId: number) {
		return this.createQueryBuilder('post')
			.select('post.id')
			.addSelect('post.title')
			.addSelect('post.text')
			.addSelect('post.createdAt')
			.addSelect('post.updatedAt')
			.addSelect('user.nickname')
			.addSelect('challenge.name')
			.addSelect('comment.text')
			.addSelect('comment.createdAt')
			.addSelect('comment.updatedAt')
			.addSelect('writer.nickname')
			.innerJoin('post.user', 'user')
			.innerJoin('post.challenge', 'challenge')
			.leftJoin('post.comment', 'comment')
			.leftJoin('comment.user', 'writer')
			.loadRelationCountAndMap('post.likeCount', 'post.like', 'likeCount')
			.where('post.challengeId = :challengeId', { challengeId })
			.getMany();
	}

	async checkPost(challengeId: number, postId: number): Promise<Post> {
		return this.findOne({ id: postId, challengeId });
	}
}
