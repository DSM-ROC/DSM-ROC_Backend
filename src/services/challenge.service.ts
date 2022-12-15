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

	async createChallenge(challengeInfo: ChallengeInfo, user: User) {
		const alreadyChallenge = await this.challengeRepository.findByName(challengeInfo.name);
    
		if (alreadyChallenge) {
      if(challengeInfo.limitMember < 5 || challengeInfo.limitMember > 30) 
        throw new BadRequestError(`Error limitMember`);
      
      if(challengeInfo.period < 7 || challengeInfo.period > 30)
        throw new BadRequestError(`Error Period`);
  
			throw new ConflictError();
		}
		return this.challengeRepository.createChallenge(challengeInfo, user);
	}

	async searchChallenge(searchWord: string) {
		return this.challengeRepository.searchChallenge(searchWord);
	}

	async joinChallenge(challengeId: number, user: User) {
		const challenge = await this.challengeRepository.getOneChallenge(challengeId);
		if (challenge) {
			if (!(await this.joinRepository.checkChallenge(challengeId, user))) {
				this.joinRepository.JoinChallenge(challengeId, user);
			} else throw new ConflictError();
		} else throw new NotFoundError();
	}

	async getOneChallenge(challengeId: number) {
		const challenge = await this.challengeRepository.getOneChallenge(challengeId);

		if (challenge) return challenge;
		throw new NotFoundError();
	}

	async getAllChallenge() {
		return this.challengeRepository.getAllChallenge();
	}

	async getChallengeMember(challengeId: number, user: User) {
		const challenge = await this.challengeRepository.getOneChallenge(challengeId);
		const check = await this.joinRepository.checkChallenge(challengeId, user);

		if (challenge) {
			if (check) return this.joinRepository.getChallengeMember(challengeId);
			throw new ForbiddenError();
		}
		throw new NotFoundError();
	}

	async getMyChallenge(user: User) {
		return this.joinRepository.getMyChallenge(user);
	}
}
