import { BaseEntity, Entity, Column,OneToMany, ManyToOne,JoinColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { HandicapType } from './applicant_type';
import { Type } from 'class-transformer';
import { Certificate } from './certificate.entity';
import { Applicant } from './applicant_master.entity';
import { Zone } from './zone_master.entity';

@Entity('tbl_ward_master')
export class Ward extends BaseEntity {
  @PrimaryGeneratedColumn()
  wardId: number;

  @Column()
  wardNumber: string;

  @Column()
  wardName: string;

  @Column()
  wardDescription: string;

  @OneToMany(() => Applicant, (applicant) => applicant.ward)
  applicant: Applicant[]

  @ManyToOne(() => Zone, (zone) => zone.ward, {eager: true})
  zone: Zone
}
