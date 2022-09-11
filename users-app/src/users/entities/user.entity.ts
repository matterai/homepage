import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  evmAddress: string;

  @Column('varchar', { nullable: true })
  displayName: string;

  @Column('varchar', { nullable: true, unique: true })
  email: string;

  @Column('datetime2', { nullable: false, default: () => 'now()' })
  created: Date;

  @Column('datetime2', { nullable: true })
  updated: Date;
}
