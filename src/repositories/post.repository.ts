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
}
