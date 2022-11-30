import { EntityRepository, getCustomRepository, Like, Repository } from "typeorm";
import { Challenge } from "../entity/challenge";
import { Join } from "../entity/join";
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
      newChallenge.leader = user.id;

      return await this.save(newChallenge);
    }

    async findByName(name: string): Promise<Challenge> {
      return await this.findOne({ name });
    }

    async getOneChallenge(id: number): Promise<Challenge> {
      return await this.findOne({ id });
    }

    async getAllChallenge(): Promise<Challenge[]> {
      return await this.find();
    }

    async searchChallenge(searchWord: string) {
      return this.find({
        where: { name: Like(`%${searchWord}%`) },
      });
    }
}