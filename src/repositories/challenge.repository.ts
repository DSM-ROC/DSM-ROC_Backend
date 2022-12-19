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
		newChallenge.startDay = challengeInfo.startDay;
		newChallenge.endDay = challengeInfo.endDay;
		newChallenge.topic = challengeInfo.topic;
		newChallenge.leader = user.id;

		return this.save(newChallenge);
	}

	async findByName(name: string): Promise<Challenge> {
		return this.findOne({ name });
	}

	async getOneChallenge(id: number) {
		return this.createQueryBuilder('challenge')
			.select('challenge.id')
			.addSelect('challenge.name')
			.addSelect('user.nickname')
			.addSelect('challenge.introduction')
			.addSelect('challenge.limitMember')
			.addSelect('challenge.startDay')
			.addSelect('challenge.endDay')
			.addSelect('challenge.topic')
			.addSelect('challenge.createdAt')
			.innerJoin('challenge.user', 'user')
			.loadRelationCountAndMap('challenge.joinMember', 'challenge.join')
			.where('challenge.id = :challenge_id', { challenge_id: id })
			.getOne();
	}

	async getAllChallenge() {
		return this.createQueryBuilder('challenge')
			.select('challenge.id')
			.addSelect('challenge.name')
			.addSelect('user.nickname')
			.addSelect('challenge.introduction')
			.addSelect('challenge.limitMember')
			.addSelect('challenge.startDay')
			.addSelect('challenge.endDay')
			.addSelect('challenge.topic')
			.addSelect('challenge.createdAt')
			.innerJoin('challenge.user', 'user')
			.loadRelationCountAndMap('challenge.joinMember', 'challenge.join')
			.getMany();
	}

	async searchChallenge(searchWord: string) {
		return this.createQueryBuilder('challenge')
			.select('challenge.id')
			.addSelect('challenge.name')
			.addSelect('user.nickname')
			.addSelect('challenge.introduction')
			.addSelect('challenge.limitMember')
			.addSelect('challenge.startDay')
			.addSelect('challenge.endDay')
			.addSelect('challenge.topic')
			.addSelect('challenge.createdAt')
			.innerJoin('challenge.user', 'user')
			.loadRelationCountAndMap('challenge.joinMember', 'challenge.join')
			.where('challenge.name like :searchWord OR challenge.introduction like :searchWord', {
				searchWord,
			})
			.getMany();
	}
}
