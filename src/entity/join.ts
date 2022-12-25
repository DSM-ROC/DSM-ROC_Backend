import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Challenge } from './challenge';
import { User } from './user';

@Entity({ name: 'join' })
export class Join {
	@PrimaryColumn()
	challengeId: number;

	@PrimaryColumn()
	userId: number;

	@ManyToOne(() => User, user => user.join, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User;

	@ManyToOne(() => Challenge, challenge => challenge.join, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'challengeId' })
	challenge: Challenge;
}
