import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Join } from '../entity/join';
import { User } from '../entity/user';

@EntityRepository(Join)
export class JoinRepository extends Repository<Join> {
	static getQueryRepository() {
		return getCustomRepository(JoinRepository);
	}

	async joinChallenge(challengeId: number, user: User): Promise<Join> {
		const join = new Join();

		join.challengeId = challengeId;
		join.userId = user.id;

		return this.save(join);
	}

	async exitChallenge(challengeId: number, user: User) {
		return this.delete({ challengeId, userId: user.id });
	}

	async checkJoinChallenge(challengeId: number, user: User): Promise<Join> {
		return this.findOne({ challengeId, userId: user.id });
	}

	async getChallengeMember(challengeId: number) {
		return this.createQueryBuilder('join')
			.select('join.userId')
			.addSelect('user.id')
			.addSelect('user.nickname')
			.innerJoin('join.user', 'user')
			.where('join.challengeId = :challenge_id', { challenge_id: challengeId })
			.getMany();
	}

	async getMyChallenge(user: User) {
		return this.createQueryBuilder('join')
			.select('join.challengeId')
			.addSelect('user.nickname')
			.addSelect('challenge.name')
			.addSelect('challenge.coverImage')
			.innerJoin('join.challenge', 'challenge')
			.innerJoin('challenge.user', 'user')
			.loadRelationCountAndMap('challenge.joinMember', 'challenge.join')
			.where('join.userId = :user_id', { user_id: user.id })
			.getMany();
	}
}
