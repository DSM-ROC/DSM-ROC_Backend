import { EntityRepository, getCustomRepository, Like, Repository } from 'typeorm';
import { Challenge } from '../entity/challenge';
import { User } from '../entity/user';
import { ChallengeInfo } from '../shared/DataTransferObject';

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

    return this.save(newChallenge);
  }

  async findByName(name: string): Promise<Challenge> {
    return this.findOne({ name });
  }

  async getOneChallenge(id: number): Promise<Challenge> {
    return this.findOne({ id });
  }

  async getAllChallenge(): Promise<Challenge[]> {
    return this.find();
  }

  async searchChallenge(searchWord: string) {
    return this.find({
      where: { name: Like(`%${searchWord}%`) },
    });
  }
}
