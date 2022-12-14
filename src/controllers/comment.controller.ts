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

		const response = await this.commentService.createComment(challengeId, postId, text, user);

		return res.status(201).json(response);
	};

	public updateComment: BusinessLogic = async (req, res, next) => {
		const { text } = req.body;
		const challengeId = Number(req.params.challenge_id);
		const postId = Number(req.params.post_id);
		const commentId = Number(req.params.comment_id);
		const user = req.decoded;

		await this.commentService.updateComment(challengeId, postId, commentId, text, user);

		return res.status(200).json({
			message: 'updateComment success',
		});
	};

	public deleteComment: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const postId = Number(req.params.post_id);
		const commentId = Number(req.params.comment_id);
		const user = req.decoded;

		await this.commentService.deleteComment(challengeId, postId, commentId, user);

		return res.status(200).json({
			message: 'deleteComment success',
		});
	};
}
