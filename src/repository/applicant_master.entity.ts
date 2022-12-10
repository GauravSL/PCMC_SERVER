import { BaseEntity, Entity, Column,OneToMany,ManyToOne,JoinTable,JoinColumn,OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { HandicapType } from './applicant_type';
import { Type } from 'class-transformer';
import { Certificate } from './certificate.entity';
import { Ward } from './ward_master.entity';
import { ApplicantBiometric } from './applicant_biometric.entity';

@Entity('tbl_applicant_master')
export class Applicant extends BaseEntity {
  @PrimaryGeneratedColumn()
  applicantId: number;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  UDID : string;

  @Column()
  lastName: string;

  @Column()
  address: string;
  
  @Column()
  DOB: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @PrimaryColumn()
  addhar: string;

  @Column({
    type: "enum",
    enum: HandicapType
})
  handicapType: HandicapType;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  lat: string;

  @Column()
  long: string;

  @Column()
  pName: string;

  @Column()
  pDOB: string;

  @Column()
  pAddress: string;

  @Column()
  pAge: number;

  @Column()
  pAddhar: string;

  @Column()
  pMobile: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Certificate, (certificate) => certificate.applicant)
  certificate: Certificate[]

  @ManyToOne(() => Ward, (ward) => ward.applicant, {eager: true})
  @JoinColumn()
  ward: Ward

  @JoinTable()
  @OneToOne((type) => ApplicantBiometric, (applicantBiometric) => applicantBiometric.applicant, {
    cascade: true,
  })
  applicantBiometric: ApplicantBiometric
}
