import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Post } from './post';
import { User } from './user';

@Entity({ name: 'comment' })
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	postId: number;

	@Column()
	writer: number;

	@Column({ charset: 'utf8mb4', collation: 'utf8mb4_general_ci' })
	text: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => User, user => user.id, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'writer' })
	user: User;

	@ManyToOne(() => Post, post => post.id, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'postId' })
	post: Post;
}
