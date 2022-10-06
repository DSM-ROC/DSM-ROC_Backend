import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Gender {
  woman = 'woman',
  man = 'man',
  etc = 'etc'
}

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

  @Column({ type: "enum", enum: Gender, default: Gender.etc, nullable: false })
  gender: Gender;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
};