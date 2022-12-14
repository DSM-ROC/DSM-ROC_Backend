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

	@Column({ nullable: false })
	text: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => User, user => user.id, { nullable: false })
	@JoinColumn({ name: 'writer' })
	user: User;

	@ManyToOne(() => Post, post => post.id, { nullable: false })
	@JoinColumn({ name: 'postId' })
	post: Post;
}
