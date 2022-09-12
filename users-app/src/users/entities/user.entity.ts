import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  evmAddress: string;

  @Column('varchar', { nullable: true })
  displayName: string;

  @Column('varchar', { nullable: true, unique: true })
  email: string;

  @Column('timestamptz', { nullable: false, default: () => 'now()' })
  created: Date;

  @Column('timestamptz', { nullable: true })
  updated: Date;
}
