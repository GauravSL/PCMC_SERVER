import { BaseEntity, Entity, Column, JoinTable, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Applicant } from './applicant_master.entity';

@Entity('tbl_applicant_biometric')
export class ApplicantBiometric extends BaseEntity {
  @PrimaryGeneratedColumn()
  bioMetricId: number;

  @Column({ type: "varchar", length: 5000 , nullable: true})
  face: string;

  @Column({ type: "varchar", length: 5000, nullable: true })
  fingerprint: string;

  @Column({ type: "varchar", length: 5000, nullable: true })
  iris: string;

  @JoinColumn()
  @OneToOne(() => Applicant, (applicant) => applicant.applicantBiometric)
  applicant: Applicant
}
