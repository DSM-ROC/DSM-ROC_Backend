import { Challenge } from "../entity/challenge";
import { ChallengeRepository } from "../repositories/challenge.repository";
import { User } from "../entity/user";
import { ConflictError, NotFoundError } from "../shared/exception";
import { ChallengeInfo, UpdateInfo } from "../shared/DataTransferObject";
import { JoinRepository } from "../repositories/join.repository";

export class ChallengeService {
    constructor(
      private challengeRepository: ChallengeRepository,
      private joinRepository: JoinRepository,
    ) {}

    async createChallenge(challengeInfo : ChallengeInfo, user: User) {
        const alreadyChallenge = await this.challengeRepository.findByName(challengeInfo.name);
        if (alreadyChallenge) { throw new ConflictError(); };
        return await this.challengeRepository.createChallenge(challengeInfo, user);
    }
    
    async searchChallenge(searchWord: string) {
      return await this.challengeRepository.searchChallenge(searchWord);
    }

    async joinChallenge(challengeId: number, user: User) {
      const challenge = await this.challengeRepository.getOneChallenge(challengeId);
      if(challenge) {
        if(!await this.joinRepository.checkChallenge(challengeId, user)) {
          this.joinRepository.JoinChallenge(challengeId, user);
        } else throw new ConflictError();
      } else throw new NotFoundError(`this challenge`);
    }

    async getOneChallenge(id: number) {
      const challenge = await this.challengeRepository.getOneChallenge(id);

      if(challenge) return challenge;
      else throw new NotFoundError(`this challenge`);
    }
  
    async getAllChallenge() {
      return await this.challengeRepository.getAllChallenge();
    }
}