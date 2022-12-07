import { BaseEntity, Entity, Column, JoinTable, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Applicant } from './applicant_master.entity';

@Entity('tbl_applicant_biometric')
export class ApplicantBiometric extends BaseEntity {
  @PrimaryGeneratedColumn()
  bioMetricId: number;

  @Column()
  face: string;

  @Column()
  fingerprint: string;

  @Column()
  iris: string;

  @JoinColumn()
  @OneToOne(() => Applicant, (applicant) => applicant.applicantBiometric,{cascade : true})
  applicant: Applicant
}
