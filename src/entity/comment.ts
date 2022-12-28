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

	@ManyToOne(() => User, user => user.id, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'writer' })
	user: User;

	@ManyToOne(() => Post, post => post.id, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'postId' })
	post: Post;
}
