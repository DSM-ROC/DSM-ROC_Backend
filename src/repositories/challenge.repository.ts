import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Challenge } from "../entity/challenge";
import { User } from "../entity/user";
import { ChallengeInfo } from "../shared/DataTransferObject";

@EntityRepository(Challenge)
export class ChallengeRepository extends Repository<Challenge> {
    static getQueryRepository() {
        return getCustomRepository(ChallengeRepository);
    }

    async createChallenge(challengeInfo: ChallengeInfo, user: User) {
      const newChallenge = this.create();
      
      newChallenge.name = challengeInfo.name;
      newChallenge.introduction = challengeInfo.introduction;
      newChallenge.limitMember = challengeInfo.limitMember;
      newChallenge.password = challengeInfo.password;
      newChallenge.leader = user.id;

      return await this.save(newChallenge);
    };

    async findByName(name: string): Promise<Challenge> {
      const challenge = await this.findOne(name);
      return challenge;
    }
}