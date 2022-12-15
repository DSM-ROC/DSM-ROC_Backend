import { response } from 'express';
import { ChallengeRepository } from '../repositories/challenge.repository';
import { ChallengeService } from '../services/challenge.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';
import { ChallengeInfo } from '../shared/DataTransferObject';
import { JoinRepository } from '../repositories/join.repository';

export class ChallengeController {
	private challengeService: ChallengeService = new ChallengeService(
		ChallengeRepository.getQueryRepository(),
		JoinRepository.getQueryRepository(),
	);

	public createChallenge: BusinessLogic = async (req, res, next) => {
		const challengeInfo = req.body as ChallengeInfo;
		const user = req.decoded;

		const response = await this.challengeService.createChallenge(challengeInfo, user);

		return res.status(201).json(response);
	};

	public searchChallenge: BusinessLogic = async (req, res, next) => {
		const searchWord = req.query.where as string;

		const response = await this.challengeService.searchChallenge(searchWord);

		return res.status(200).json(response);
	};

	public joinChallenge: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const user = req.decoded;

		await this.challengeService.joinChallenge(challengeId, user);

		return res.status(201).json({
			message: 'joinChallenge success',
		});
	};

	public getOneChallenge: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);

		const response = await this.challengeService.getOneChallenge(challengeId);

		return res.status(200).json(response);
	};

	public getAllChallenge: BusinessLogic = async (req, res, next) => {
		const response = await this.challengeService.getAllChallenge();

		return res.status(200).json(response);
	};

	public getChallengeMember: BusinessLogic = async (req, res, next) => {
		const challengeId = Number(req.params.challenge_id);
		const user = req.decoded;

		const response = await this.challengeService.getChallengeMember(challengeId, user);

		return res.status(200).json(response);
	};

	public getMyChallenge: BusinessLogic = async (req, res, next) => {
		const user = req.decoded;

		const response = await this.challengeService.getMyChallenge(user);

		return res.status(200).json(response);
	};
}
