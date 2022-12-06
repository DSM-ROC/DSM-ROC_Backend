import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Challenge } from './challenge';
import { User } from './user';
import { Like } from './like';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  challengeId: number;

  @Column()
  writer: number;

  @Column({ nullable: false, length: 20 })
  title: string;

  @Column({ nullable: false })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Challenge, challenge => challenge.id, { nullable: false })
  @JoinColumn({ name: 'challengeId' })
  challenge: Challenge;

  @ManyToOne(() => User, user => user.id, { nullable: false })
  @JoinColumn({ name: 'writer' })
  user: User;

  @OneToMany(() => Like, like => like.post)
  like: Like[];
}
