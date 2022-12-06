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
import { User } from './user';

@Entity({ name: 'challenge' })
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 15 })
  name: string;

  @Column({ length: 200, nullable: true })
  introduction: string;

  @Column({ nullable: false })
  limitMember: number;

  @Column({ type: 'enum', enum: Topic, default: Topic.etc, nullable: false })
  topic: Topic;

  @ManyToOne(() => User, user => user.id, { nullable: false })
  @JoinColumn({ name: 'leader' })
  leader: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Join, join => join.challenge)
  join: Join[];
}
