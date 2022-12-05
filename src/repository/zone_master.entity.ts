import { BaseEntity, Entity, Column,OneToMany, JoinTable, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Ward } from './ward_master.entity';

@Entity('tbl_zone_master')
export class Zone extends BaseEntity {
  @PrimaryGeneratedColumn()
  zoneId: number;

  @Column()
  zoneNumber: string;

  @Column()
  zoneName: string;

  @Column()
  zoneDescription: string;

  @JoinTable()
  @OneToMany(() => Ward, (ward) => ward.zone,{cascade : true})
  ward: Ward[]
}
