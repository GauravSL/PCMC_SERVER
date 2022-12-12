import { Entity,OneToOne, PrimaryGeneratedColumn,JoinColumn, Column } from 'typeorm';
import { Applicant } from './applicant_master.entity';
import { User } from './user.entity';

@Entity('tbl_applicant_document')
export class ApplicantDocument {
  @PrimaryGeneratedColumn()
  docId : number;

  @Column({
    type: "longblob",
    nullable: true,
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
   })
  photo: string;

  @Column({
    type: "longblob",
    nullable: true,
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
   })
  uuid: string;

  @Column({
    type: "longblob",
    nullable: true,
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
   })
  aadharFront: string;


  @Column({
    type: "longblob",
    nullable: true,
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
   })
   aadharBack: string;

@JoinColumn()
 @OneToOne(() => Applicant, (applicant) => applicant.applicantId)
 applicant: Applicant
}
