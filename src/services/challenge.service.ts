import { Challenge } from "../entity/challenge";
import { ChallengeRepository } from "../repositories/challenge.repository";
import { User } from "../entity/user";
import { ConflictError } from "../shared/exception";
import { ChallengeInfo, UpdateInfo } from "../shared/DataTransferObject";

export class ChallengeService {
    constructor(private challengeRepository: ChallengeRepository) {}

    async createChallenge(challengeInfo : ChallengeInfo, user: User) {
        const alreadyChallenge = await this.challengeRepository.findByName(challengeInfo.name);
        if (alreadyChallenge) { throw new ConflictError(); };
        return await this.challengeRepository.createChallenge(challengeInfo, user);
      }
    
    async searchChallenge(searchWord: string) {
      return await this.challengeRepository.searchChallenge(searchWord);
    }
}