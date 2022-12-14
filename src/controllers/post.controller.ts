import { ChallengeRepository } from '../repositories/challenge.repository';
import { CommentRepository } from '../repositories/comment.repository';
import { JoinRepository } from '../repositories/join.repository';
import { LikeRepository } from '../repositories/like.repository';
import { PostRepository } from '../repositories/post.repository';
import { PostService } from '../services/post.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';
import { PostInfo } from '../shared/DataTransferObject';

export class PostController {
	private postService: PostService = new PostService(
		PostRepository.getQueryRepository(),
		ChallengeRepository.getQueryRepository(),
		JoinRepository.getQueryRepository(),
		CommentRepository.getQueryRepository(),
		LikeRepository.getQueryRepository(),
	);

	public createPost: BusinessLogic = async (req, res, next) => {
		const postInfo = req.body as PostInfo;
		const challengeId = Number(req.params.challenge_id);
		const user = req.decoded;

		const response = await this.postService.createPost(challengeId, postInfo, user);

		return res.status(201).json(response);
	};

	public updatePost: BusinessLogic = async (req, res, next) => {
		const postInfo = req.body as PostInfo;
		const challengeId = Number(req.params.challenge_id);
		const postId = Number(req.params.post_id);
		const user = req.decoded;

		await this.postService.updatePost(challengeId, postId, postInfo, user);

		return res.status(200).json({ message: 'updatePost success' });
	};

	public deletePost: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const postId = Number(req.params.post_id);
		const user = req.decoded;

		await this.postService.deletePost(challengeId, postId, user);

		return res.status(200).json({ message: 'deletePost success' });
	};

	public getOnePost: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const postId = Number(req.params.post_id);
		const user = req.decoded;

		const response = await this.postService.getOnePost(challengeId, postId, user);

		return res.status(200).json(response);
	};

	public getAllPost: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const user = req.decoded;

		const response = await this.postService.getAllPost(challengeId, user);

		return res.status(200).json(response);
	};
}
