import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './post';
import { User } from './user';

@Entity({ name: 'like' })
export class Like {
	@PrimaryColumn()
	postId: number;

	@PrimaryColumn()
	userId: number;

	@ManyToOne(() => User, user => user.like, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	user: User;

	@ManyToOne(() => Post, post => post.like, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'postId' })
	post: Post;
}
