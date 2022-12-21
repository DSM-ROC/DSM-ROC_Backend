import { ChallengeRepository } from '../repositories/challenge.repository';
import { CommentRepository } from '../repositories/comment.repository';
import { JoinRepository } from '../repositories/join.repository';
import { PostRepository } from '../repositories/post.repository';
import { CommentService } from '../services/comment.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';

export class CommentController {
	private commentService: CommentService = new CommentService(
		CommentRepository.getQueryRepository(),
		ChallengeRepository.getQueryRepository(),
		JoinRepository.getQueryRepository(),
		PostRepository.getQueryRepository(),
	);

	public createComment: BusinessLogic = async (req, res, next) => {
		const { text } = req.body;
		const challengeId = Number(req.params.challenge_id);
		const postId = Number(req.params.post_id);
		const user = req.decoded;

		console.log(challengeId, postId);
		const response = await this.commentService.createComment(challengeId, postId, text, user);

		return res.status(201).json(response);
	};
}
