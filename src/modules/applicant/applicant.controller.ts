import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicantBiometric } from 'src/repository/applicant_biometric.entity';
import { Applicant } from 'src/repository/applicant_master.entity';
import { Certificate } from 'src/repository/certificate.entity';
import { ApplicantService } from './applicant.service';
import { BiometricReq } from './dto/biometric.req';

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

    @Get('/:applicantId/biometric')
    getBiometric(@Param('applicantId')applicantId: number){        
        return this.applicationService.getBiometric(applicantId)
    }
    
    @Post('/:applicantId/biometric')
    insertFace(@Body() biometricReq: BiometricReq, @Param("applicantId") applicantId){
        return this.applicationService.insertFace(applicantId, biometricReq)
    }
}
