import { Entity, Column,OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Certificate } from './certificate.entity';

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  passward: string;

  @Column()
  email: string;

  @Column()
  mobile: string;  

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Certificate, (certificate) => certificate.applicant)
  certificate: Certificate[]
  
}
