import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'join' })
export class Join {
  @PrimaryColumn()
  challengeId: number;

  @PrimaryColumn()
  userId: number;
}
