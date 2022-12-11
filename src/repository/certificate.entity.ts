import { Entity, Column, ManyToOne,CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Applicant } from './applicant_master.entity';
import { User } from './user.entity';

@Entity('tbl_certificate')
export class Certificate {
  @PrimaryGeneratedColumn()
  certificateId : number;

  @Column()
  year : string;

  @CreateDateColumn()
  createdOn : string;
  
  @Column()
  lat : string;

  @Column()
  long : string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.certificate)
  createdBy : User;

  @ManyToOne(() => Applicant, (applicant) => applicant.certificate)
  applicant: Applicant
}
