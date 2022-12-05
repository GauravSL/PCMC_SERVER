import { HttpException, Injectable } from '@nestjs/common';
import  * as InjectRepo from '@nestjs/typeorm';
import { Ward } from 'src/repository/ward_master.entity';
import { Zone } from 'src/repository/zone_master.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZoneWardService {
    constructor(
        @InjectRepo.InjectRepository(Zone) private zoneRepository: Repository<Zone>,
        @InjectRepo.InjectRepository(Ward) private wardRepository: Repository<Ward>,
      ) {}
    
      async findAll(){
        let listOfZones =  await this.zoneRepository.find({}); 
        let listOfWard = await this.wardRepository.find({}); 
        //listOfZones.map(zone => zone.ward  = listOfWard.filter(ward=> ward.zone))                
         return listOfWard;       
      }
}
