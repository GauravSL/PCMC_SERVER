import { Module } from '@nestjs/common';
import { ZoneWardService } from './zone-ward.service';
import { ZoneWardController } from './zone-ward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from 'src/repository/zone_master.entity';
import { Ward } from 'src/repository/ward_master.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Zone, Ward])],
  providers: [ZoneWardService],
  controllers: [ZoneWardController]
})
export class ZoneWardModule {}
