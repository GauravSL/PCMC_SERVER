import { BaseEntity, Entity, Column, JoinTable, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Applicant } from './applicant_master.entity';

@Entity('tbl_applicant_biometric')
export class ApplicantBiometric extends BaseEntity {
  @PrimaryGeneratedColumn()
  bioMetricId: number;

  @Column({ type: "varchar", length: 5000 })
  face: string;

  @Column({ type: "varchar", length: 5000 })
  fingerprint: string;

  @Column({ type: "varchar", length: 5000 })
  iris: string;

  @JoinColumn()
  @OneToOne(() => Applicant, (applicant) => applicant.applicantBiometric,{cascade : true})
  applicant: Applicant
}
