import { ChallengeRepository } from '../repositories/challenge.repository';
import { JoinRepository } from '../repositories/join.repository';
import { LikeRepository } from '../repositories/like.repository';
import { PostRepository } from '../repositories/post.repository';
import { LikeSerivce } from '../services/like.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';

export class LikeController {
	private likeService: LikeSerivce = new LikeSerivce(
		LikeRepository.getQueryRepository(),
		ChallengeRepository.getQueryRepository(),
		JoinRepository.getQueryRepository(),
		PostRepository.getQueryRepository(),
	);

	public postLike: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const postId = Number(req.params.post_id);
		const user = req.decoded;

		const response = await this.likeService.postLike(challengeId, postId, user);

		if (response === true) return res.status(201).json({ message: 'postLike success' });
		return res.status(200).json({ message: 'cancel postLike success' });
	};
}
