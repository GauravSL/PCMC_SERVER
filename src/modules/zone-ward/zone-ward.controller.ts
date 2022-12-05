import { Controller, Get } from '@nestjs/common';
import { ZoneWardService } from './zone-ward.service';

@Controller('zone-ward')
export class ZoneWardController {
    constructor(private readonly zoneWardService: ZoneWardService){}
    
    
    @Get('/all')
    findAll(){
        return this.zoneWardService.findAll();
    }

}
