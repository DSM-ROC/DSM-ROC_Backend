import { ChallengeRepository } from '../repositories/challenge.repository';
import { JoinRepository } from '../repositories/join.repository';
import { PostRepository } from '../repositories/post.repository';
import { PostService } from '../services/post.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';
import { PostInfo } from '../shared/DataTransferObject';

export class PostController {
	private postService: PostService = new PostService(
		PostRepository.getQueryRepository(),
		ChallengeRepository.getQueryRepository(),
		JoinRepository.getQueryRepository(),
	);

	public createPost: BusinessLogic = async (req, res, next) => {
		const postInfo = req.body as PostInfo;
		const challengeId = Number(req.params.challenge_id);
		const user = req.decoded;

		const response = await this.postService.createPost(challengeId, postInfo, user);

		return res.status(201).json(response);
	};
}
