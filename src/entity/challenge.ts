import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
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

  @ManyToOne(() => User, user => user.id, { nullable: false })
  @JoinColumn({ name: 'leader' })
  leader: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Join, (join) => join.challenge)
  join: Join[];
}
