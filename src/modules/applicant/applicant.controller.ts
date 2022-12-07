import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicantBiometric } from 'src/repository/applicant_biometric.entity';
import { Applicant } from 'src/repository/applicant_master.entity';
import { Certificate } from 'src/repository/certificate.entity';
import { ApplicantService } from './applicant.service';

@Controller('applicant')
export class ApplicantController {
    constructor(private readonly applicationService: ApplicantService){}
    
    @Post('/')
    create(@Body() applicant: Applicant){
        return this.applicationService.create(applicant);
    }

    @Get('/all')
    findAll(){
        return this.applicationService.findAll();
    }

    @Get('/:aadhar')
    findOne(@Param('aadhar')addhar: string){
        return this.applicationService.findOne(addhar);
    }

    @Post('/certificate')
    submitCertificate(@Body() certificate: Certificate){
        return this.applicationService.submitCertificate(certificate)
    }

    @Get('/certificate/:aadhar')
    findCertificate(@Param('aadhar')addhar: string){
        return this.applicationService.findCertificate(addhar)
    }

    @Get('/biometric/:applicantId')
    getBiometric(@Param('applicantId')applicantId: number){
        console.log(applicantId)
        return this.applicationService.getBiometric(applicantId)
    }
    
    @Post('/biometric')
    insertFace(@Body() applicantBiometric: ApplicantBiometric){
        return this.applicationService.insertFace(applicantBiometric)
    }
}
