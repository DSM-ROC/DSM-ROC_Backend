import { ChallengeRepository } from '../repositories/challenge.repository';
import { User } from '../entity/user';
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from '../shared/exception';
import { ChallengeInfo } from '../shared/DataTransferObject';
import { JoinRepository } from '../repositories/join.repository';

export class ChallengeService {
	constructor(
		private challengeRepository: ChallengeRepository,
		private joinRepository: JoinRepository,
	) {}

	async createChallenge(challengeInfo: ChallengeInfo, image: string, user: User) {
		const alreadyChallenge = await this.challengeRepository.findByName(challengeInfo.name);

		if (alreadyChallenge) throw new ConflictError('Challenge Already Exist');

		await this.getDateDiff(challengeInfo.startDay, challengeInfo.endDay);
		await this.limitMemberCheck(challengeInfo.limitMember);

		const challenge = await this.challengeRepository.createChallenge(challengeInfo, image, user);
		return this.joinRepository.joinChallenge(challenge.id, user);
	}

	async searchChallenge(searchWord: string) {
		return this.challengeRepository.searchChallenge(searchWord);
	}

	async joinChallenge(challengeId: number, user: User) {
		if (await this.challengeRepository.getOneChallenge(challengeId)) {
			await this.checkDate(challengeId);

			if (!(await this.joinRepository.checkJoinChallenge(challengeId, user))) {
				this.joinRepository.joinChallenge(challengeId, user);
			} else throw new ConflictError('Challenge Already Join');
		} else throw new NotFoundError('Challenge Not Found');
	}

	async exitChallenge(challengeId: number, user: User) {
		const challenge = await this.challengeRepository.getOneChallenge(challengeId);

		if (challenge) {
			if (await this.joinRepository.checkJoinChallenge(challengeId, user))
				this.joinRepository.exitChallenge(challengeId, user);
			else throw new ForbiddenError('Challenge Not Join');
		} else throw new NotFoundError('Challenge Not Found');
	}

	async getOneChallenge(challengeId: number) {
		const challenge = await this.challengeRepository.getOneChallenge(challengeId);

		if (challenge) return challenge;
		throw new NotFoundError('Challenge Not Found');
	}

	async getAllChallenge() {
		return this.challengeRepository.getAllChallenge();
	}

	async getChallengeMember(challengeId: number, user: User) {
		await this.checkChallenge(challengeId, user);
		return this.joinRepository.getChallengeMember(challengeId);
	}

	async getMyChallenge(user: User) {
		return this.joinRepository.getMyChallenge(user);
	}

	async getDateDiff(startDay: Date, endDay: Date) {
		const StartDay = new Date(startDay);
		const EndDay = new Date(endDay);

		const diffDate = StartDay.getTime() - EndDay.getTime();

		const period = Math.abs(diffDate / (1000 * 60 * 60 * 24));

		if (period < 7 || period > 30 || diffDate > 0) throw new BadRequestError(`Error Date`);
	}

	async limitMemberCheck(limitMember: number) {
		if (limitMember < 5 || limitMember > 30) throw new BadRequestError(`Error limitMember`);
	}

	async checkChallenge(challengeId: number, user: User) {
		if (!(await this.challengeRepository.getOneChallenge(challengeId))) throw new NotFoundError();
		if (!(await this.joinRepository.checkJoinChallenge(challengeId, user)))
			throw new ForbiddenError('Challenge Not Join');
	}

	async checkDate(challengeId: number) {
		const Today = new Date();

		const { endDay } = await this.challengeRepository.getOneChallenge(challengeId);

		const diffEndDate = endDay.getTime() - Today.getTime();

		if (diffEndDate < 0) throw new BadRequestError('종료된 챌린지');
	}
}
