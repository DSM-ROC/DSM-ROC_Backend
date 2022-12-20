import { User } from '../entity/user';
import { ChallengeRepository } from '../repositories/challenge.repository';
import { JoinRepository } from '../repositories/join.repository';
import { PostRepository } from '../repositories/post.repository';
import { PostInfo } from '../shared/DataTransferObject';
import { ForbiddenError, NotFoundError } from '../shared/exception';

export class PostService {
	constructor(
		private postRepository: PostRepository,
		private challengeRepository: ChallengeRepository,
		private joinRepository: JoinRepository,
	) {}

	async createPost(challengeId: number, postInfo: PostInfo, user: User) {
		await this.checkApi(challengeId, user);
		return this.postRepository.createPost(challengeId, postInfo, user);
	}

	async checkApi(challengeId: number, user: User) {
		if (!(await this.challengeRepository.getOneChallenge(challengeId))) throw new NotFoundError();
		if (!(await this.joinRepository.checkJoinChallenge(challengeId, user)))
			throw new ForbiddenError();
	}
}
