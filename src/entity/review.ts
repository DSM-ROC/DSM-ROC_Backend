import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	PrimaryColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Challenge } from './challenge';
import { User } from './user';

@Entity({ name: 'review' })
export class Review {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	challengeId: number;

	@Column()
	userId: number;

	@Column()
	text: string;

	@CreateDateColumn({ name: 'createdAt' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedAt' })
	updatedAt: Date;

	@ManyToOne(() => User, user => user.review)
	@JoinColumn({ name: 'userId' })
	user: User;

	@ManyToOne(() => Challenge, challenge => challenge.review)
	@JoinColumn({ name: 'challengeId' })
	challenge: Challenge;
}
