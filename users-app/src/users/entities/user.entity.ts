import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column('varchar', { nullable: true, unique: true })
  evmAddress: string;

  @Column('varchar', { nullable: true })
  displayName: string;

  @Index({ unique: true })
  @Column('varchar', { nullable: true, unique: true })
  email: string;

  @Column('timestamptz', { nullable: false, default: () => 'now()' })
  created: Date;

  @Column('timestamptz', { nullable: true })
  updated: Date;
}
