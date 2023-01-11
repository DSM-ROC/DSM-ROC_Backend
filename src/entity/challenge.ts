import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { Topic } from './enum/topic.enum';
import { Join } from './join';
import { Post } from './post';
import { Review } from './review';
import { User } from './user';

@Entity({ name: 'challenge' })
export class Challenge {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, nullable: false, length: 15 })
	name: string;

	@Column({ type: 'text', nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_general_ci' })
	introduction: string;

	@Column({ nullable: true })
	coverImage: string;

	@Column({ nullable: false })
	limitMember: number;

	@Column({ nullable: true })
	startDay: Date;

	@Column({ nullable: true })
	endDay: Date;

	@Column({ type: 'enum', enum: Topic, default: Topic.etc, nullable: false })
	topic: Topic;

	@Column()
	leader: number;

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

	@OneToMany(() => Join, join => join.challenge, { cascade: true })
	join: Join[];

	@OneToMany(() => Review, review => review.challenge, { cascade: true })
	review: Review[];

	@OneToMany(() => Post, post => post.challenge, { cascade: true })
	post: Post[];

	@ManyToOne(() => User, user => user.id, { nullable: false, cascade: true, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'leader' })
	user: User;
}
