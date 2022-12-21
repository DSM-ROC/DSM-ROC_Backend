import { ChallengeRepository } from '../repositories/challenge.repository';
import { JoinRepository } from '../repositories/join.repository';
import { ReviewRepository } from '../repositories/review.repository';
import { ReviewService } from '../services/review.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';

export class ReviewController {
	private reviewService: ReviewService = new ReviewService(
		ReviewRepository.getQueryRepository(),
		JoinRepository.getQueryRepository(),
		ChallengeRepository.getQueryRepository(),
	);

	public createReview: BusinessLogic = async (req, res, next) => {
		const { text } = req.body;
		const challengeId = Number(req.params.challenge_id);
		const user = req.decoded;

		const response = await this.reviewService.createReview(challengeId, text, user);

		return res.status(201).json(response);
	};

	public updateReview: BusinessLogic = async (req, res, next) => {
		const { text } = req.body;
		const challengeId = Number(req.params.challenge_id);
		const reviewId = Number(req.params.review_id);
		const user = req.decoded;

		await this.reviewService.updateReview(challengeId, reviewId, text, user);

		return res.status(200).json({ message: 'update success' });
	};

	public deleteReview: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const reviewId = Number(req.params.review_id);
		const user = req.decoded;

		await this.reviewService.deleteReview(challengeId, reviewId, user);

		return res.status(200).json({ message: 'delete success' });
	};

	public getAllReview: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const user = req.decoded;

		const response = await this.reviewService.getAllReview(challengeId, user);

		return res.status(200).json(response);
	};

	public getOneReview: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const reviewId = Number(req.params.review_id);
		const user = req.decoded;

		const response = await this.reviewService.getOneReview(challengeId, reviewId, user);

		return res.status(200).json(response);
	};
}
