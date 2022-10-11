import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Challenge } from "../entity/challenge";

@EntityRepository(Challenge)
export class ChallengeRepository extends Repository<Challenge> {
    static getQueryRepository() {
        return getCustomRepository(ChallengeRepository);
      }
}