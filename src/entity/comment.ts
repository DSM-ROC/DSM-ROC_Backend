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

  @ManyToOne(() => Post, post => post.id, { nullable: false })
  @JoinColumn({ name: 'postId' })
  postId: number;

  @ManyToOne(() => User, user => user.id, { nullable: false })
  @JoinColumn({ name: 'writer' })
  writer: number;

  @Column({ nullable: false })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
