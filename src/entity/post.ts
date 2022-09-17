import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Challenge } from './challenge';
import { User } from './user';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Challenge, challenge => challenge.id, { nullable: false })
  @JoinColumn({ name: 'challengeId' })
  challengeId: number;

  @ManyToOne(() => User, user => user.id, { nullable: false })
  @JoinColumn({ name: 'writer' })
  writer: number;

  @Column({ nullable: false, length: 20 })
  title: string;

  @Column({ nullable: false })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User)
  @JoinTable({ name: 'like' })
  like: User;
}
