import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Post } from '../entity/post';
import { User } from '../entity/user';
import { PostInfo } from '../shared/DataTransferObject';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
	static getQueryRepository() {
		return getCustomRepository(PostRepository);
	}

	async createPost(challengeId: number, postInfo: PostInfo, user: User) {
		const newPost = new Post();

		newPost.title = postInfo.title;
		newPost.text = postInfo.text;
		newPost.writer = user.id;
		newPost.challengeId = challengeId;

		return this.save(newPost);
	}

	async updatePost(postId: number, postInfo: PostInfo, user: User) {
		return this.update(
			{
				id: postId,
				writer: user.id,
			},
			{
				title: postInfo.title,
				text: postInfo.text,
			},
		);
	}

	async deletePost(postId: number, user: User) {
		return this.delete({
			id: postId,
			writer: user.id,
		});
	}

	async getOnePost(challengeId: number, postId: number) {
		return this.createQueryBuilder('post')
			.select('post.id')
			.addSelect('post.title')
			.addSelect('post.text')
			.addSelect('post.createdAt')
			.addSelect('post.updatedAt')
			.addSelect('user.nickname')
			.addSelect('challenge.name')
			.innerJoin('post.user', 'user')
			.innerJoin('post.challenge', 'challenge')
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
			.innerJoin('post.user', 'user')
			.innerJoin('post.challenge', 'challenge')
			.where('post.challengeId = challengeId', { challengeId })
			.getMany();
	}

	async checkPost(challengeId: number, postId: number) {
		return this.findOne({ id: postId, challengeId });
	}
}
