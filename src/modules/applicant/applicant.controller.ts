import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicantBiometric } from 'src/repository/applicant_biometric.entity';
import { Applicant } from 'src/repository/applicant_master.entity';
import { Certificate } from 'src/repository/certificate.entity';
import { ApplicantService } from './applicant.service';
import { BiometricReq } from './dto/biometric.req';
import { CertificateReq } from './dto/certificate.req';
import { DocumentReq } from './dto/document.req';

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

    @Post('/:applicantId/certificate')
    submitCertificate(@Body() certificateReq: CertificateReq, @Param("applicantId") applicantId){
        return this.applicationService.submitCertificate(applicantId, certificateReq)
    }

    @Get('/:applicantId/certificate')
    findCertificate(@Param("applicantId") applicantId){
        return this.applicationService.findCertificate(applicantId)
    }

    @Get('/:applicantId/biometric')
    getBiometric(@Param('applicantId')applicantId: number){        
        return this.applicationService.getBiometric(applicantId)
    }
    
    @Post('/:applicantId/biometric')
    insertFace(@Body() biometricReq: BiometricReq, @Param("applicantId") applicantId){
        return this.applicationService.insertFace(applicantId, biometricReq)
    }


    @Get('/:applicantId/document/:documentType')
    getApplicantDocumentByType(
    @Param('applicantId')applicantId: number,
    @Param('documentType')documentType: string
    ){        
        return this.applicationService.getApplicantDocumentByType(applicantId,documentType)
    }
    
    @Post('/:applicantId/document')
    insertApplicantDocumentByType(
        @Body() documentReq: DocumentReq, 
        @Param("applicantId") applicantId,    
    ){
        return this.applicationService.insertApplicantDocumentByType(applicantId,documentReq)
    }
}
