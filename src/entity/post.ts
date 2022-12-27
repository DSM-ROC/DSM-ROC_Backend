import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Challenge } from './challenge';
import { User } from './user';
import { Like } from './like';
import { Comment } from './comment';

@Entity({ name: 'post' })
export class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	challengeId: number;

	@Column()
	writer: number;

	@Column({ charset: 'utf8mb4', collation: 'utf8mb4_general_ci', length: 25 })
	title: string;

	@Column({ charset: 'utf8mb4', collation: 'utf8mb4_general_ci' })
	text: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => Challenge, challenge => challenge.id, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'challengeId' })
	challenge: Challenge;

	@ManyToOne(() => User, user => user.id, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'writer' })
	user: User;

	@OneToMany(() => Like, like => like.post, { cascade: true })
	like: Like[];

	@OneToMany(() => Comment, comment => comment.post, { cascade: true })
	comment: Comment[];
}
