import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
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

	@Column({ type: 'text', charset: 'utf8mb4', collation: 'utf8mb4_general_ci' })
	text: string;

	@CreateDateColumn({
		type: 'timestamp',
		nullable: false,
		name: 'createdAt',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		nullable: false,
		name: 'updatedAt',
	})
	updatedAt: Date;

	@ManyToOne(() => User, user => user.review, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User;

	@ManyToOne(() => Challenge, challenge => challenge.review, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'challengeId' })
	challenge: Challenge;
}
