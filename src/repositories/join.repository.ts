import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Join } from "../entity/join";
import { User } from "../entity/user";

@EntityRepository(Join)
export class JoinRepository extends Repository<Join> {
    static getQueryRepository() {
        return getCustomRepository(JoinRepository);
    }

    async JoinChallenge(challengeId: number, user: User) {
       const Join = this.create();

       Join.challengeId = challengeId;
       Join.userId = user.id;

       return await this.save(Join);
    }

    async checkChallenge(challengeId: number, user: User) {
        const challenge = await this.findOne({ challengeId, userId: user.id })
        return challenge;
    }

    async getChallengeMember(challengeId: number) {
        return await this.createQueryBuilder('join')
            .select('join.userId')
            .addSelect('user.nickname')
            .innerJoin('join.user', 'user')
            .where('join.challengeId = :challenge_id', { challenge_id: challengeId })
            .getMany();
    }
}