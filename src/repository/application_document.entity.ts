import { Entity, Column, ManyToOne,CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Applicant } from './applicant_master.entity';
import { User } from './user.entity';

@Entity('tbl_applicant_document')
export class ApplicantDocument {
  @PrimaryGeneratedColumn()
  docId : number;

 // @ManyToOne(() => Applicant, (applicant) => applicant.certificate)
//  applicant: Applicant
}
