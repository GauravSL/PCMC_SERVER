import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { Applicant } from 'src/repository/applicant_master.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from 'src/repository/certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant, Certificate])],
  providers: [ApplicantService],
  controllers: [ApplicantController]
})
export class ApplicantModule {}
