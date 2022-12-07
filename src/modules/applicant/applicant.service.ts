import { HttpException, Injectable } from '@nestjs/common';
import  * as InjectRepo from '@nestjs/typeorm';
import { ApplicantBiometric } from 'src/repository/applicant_biometric.entity';
import { Applicant } from 'src/repository/applicant_master.entity';
import { Certificate } from 'src/repository/certificate.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ApplicantService {
    constructor(
        @InjectRepo.InjectRepository(Applicant) private applicantRepository: Repository<Applicant>,
        @InjectRepo.InjectRepository(Certificate) private certificateRepository: Repository<Certificate>,
        @InjectRepo.InjectRepository(ApplicantBiometric) private applicantBiometricRepository: Repository<ApplicantBiometric>,
      ) {}
    
      /**
       * Create new applicant
       * @param applicant 
       * @returns 
       */
      async create(applicant: Applicant){     
        console.log(applicant);
        let addhar = applicant.addhar;
        let res = await this.applicantRepository.findOneBy({addhar});
        if(res == null){            
          return await this.applicantRepository.save(applicant);
        }else {
            throw new HttpException('User already exist', 400);
        }
      }
  
      /**
       * 
       * @param addhar Find singel application
       * @returns 
       */
      async findOne(addhar: string): Promise<Applicant>{            
            var res = await this.applicantRepository.findOneBy({addhar});
            if(res != null){
              return res;                
            }else{
              throw new HttpException('User not found', 400);
            }
      }

      /**
       * Insert certificate data into database
       * @param certificate Insert certificate
       * @returns 
       */
      async submitCertificate(certificate: Certificate) : Promise<Certificate> {
          return await this.certificateRepository.save(certificate);        
      }

      /**
       * Insert certificate data into database
       * @param certificate Insert certificate
       * @returns 
       */
       async findCertificate(applicantAadhar: string) : Promise<Certificate> {
        return await this.certificateRepository.findOne({});        
    }
  
      /**
       * Get all applicant list till date
       * @returnsx
       */
      async findAll():Promise<Applicant[]>{       
         return await this.applicantRepository.find(); 
      }  

      async insertFace(applicantBiometric: ApplicantBiometric){
          return await this.applicantBiometricRepository.save(applicantBiometric);
      }

      async getBiometric(applicantId: number){
        return await this.applicantBiometricRepository.find({});
    }
}
