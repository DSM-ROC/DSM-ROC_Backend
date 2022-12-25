import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';

import { Join } from './join';
import { Like } from './like';
import { Post } from './post';
import { Review } from './review';

@Entity({ name: 'user' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, nullable: false, length: 10 })
	nickname: string;

	@Column({ unique: true, nullable: false, length: 40 })
	email: string;

	@Column({ nullable: false })
	password: string;

	@CreateDateColumn({ name: 'createdAt' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updatedAt' })
	updatedAt: Date;

	@OneToMany(() => Join, join => join.user, { cascade: true })
	join: Join[];

	@OneToMany(() => Review, review => review.user, { cascade: true })
	review: Review[];

	@OneToMany(() => Like, like => like.user, { cascade: true })
	like: Like[];

	@OneToMany(() => Post, post => post.user, { cascade: true })
	post: Post[];
}
