import { HttpException, Injectable } from '@nestjs/common';
import  * as InjectRepo from '@nestjs/typeorm';
import { ApplicantBiometric } from 'src/repository/applicant_biometric.entity';
import { Applicant } from 'src/repository/applicant_master.entity';
import { ApplicantDocument } from 'src/repository/application_document.entity';
import { Certificate } from 'src/repository/certificate.entity';
import { User } from 'src/repository/user.entity';
import { Repository } from 'typeorm';
import { BiometricReq } from './dto/biometric.req';
import { CertificateReq } from './dto/certificate.req';
import { DocumentReq } from './dto/document.req';
@Injectable()
export class ApplicantService {
    constructor(
        @InjectRepo.InjectRepository(User) private userRepository: Repository<User>,  
        @InjectRepo.InjectRepository(Applicant) private applicantRepository: Repository<Applicant>,
        @InjectRepo.InjectRepository(Certificate) private certificateRepository: Repository<Certificate>,
        @InjectRepo.InjectRepository(ApplicantBiometric) private applicantBiometricRepository: Repository<ApplicantBiometric>,
        @InjectRepo.InjectRepository(ApplicantDocument) private applicantDocumentRepository: Repository<ApplicantDocument>,
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
          try{
            return await this.applicantRepository.save(applicant);
          }catch(err){
            console.log(err)
            throw new HttpException('Applicant already exist', 400);
          }     
          
        }else {
            throw new HttpException('Applicant already exist', 400);
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
              throw new HttpException('Applicant not found', 400);
            }
      }

      /**
       * Insert certificate data into database
       * @param certificateReq Insert certificate
       * @param applicantId Applicant Id
       * @returns 
       */
      async submitCertificate(applicantId: number, certificateReq: CertificateReq) : Promise<Certificate> {
        let applicant = await this.applicantRepository.findOneBy({applicantId})
        let user = await this.userRepository.findOne({where: {userId: certificateReq.userId}})
        //if applicant not present throw user not found error
        if(applicant == null || user == null){
          throw new HttpException('User or Applicant not found', 400);
        }else{
          let certificate = new Certificate();
          certificate.lat = certificateReq.lat;
          certificate.long = certificateReq.long;
          certificate.applicant = applicant;
          certificate.createdBy = user;
          certificate.year = certificateReq.year;      
            return await this.certificateRepository.save(certificate);              
        }    
      }

      /**
       * Insert certificate data into database
       * @param certificate Insert certificate
       * @returns 
       */
       async findCertificate(applicantId: number) : Promise<Certificate> {
        let applicant = await this.applicantRepository.findOneBy({applicantId})
        //if applicant not present throw user not found error
        if(applicant == null){
          throw new HttpException('Applicant not found', 400);
        }else{
          let certificate = await this.certificateRepository.findOne({where : {applicant: {applicantId: (await applicant).applicantId}}});  
          if(certificate != null){
            return certificate;
          }else{
            throw new HttpException("No data found", 400)
          }    
        }      
    }
  
      /**
       * Get all applicant list till date
       * @returnsx
       */
      async findAll():Promise<Applicant[]>{       
         return await this.applicantRepository.find(); 
      }  

      async insertFace(applicantId: number,biometricReq: BiometricReq){
          let applicant = await this.applicantRepository.findOneBy({applicantId})
          
          //if applicant not present throw user not found error
          if(applicant == null){
            throw new HttpException('User not found', 400);
          }

          
          let applicantBiometric = await this.applicantBiometricRepository.findOne(
            {where: { applicant : {applicantId : (await applicant).applicantId}},
          });
          if(applicantBiometric == null){
            applicantBiometric = new ApplicantBiometric()
          }
          
          applicantBiometric.face = biometricReq.face ?? applicantBiometric.face ?? null;
          applicantBiometric.fingerprint = biometricReq.fingerprint ?? applicantBiometric.fingerprint ?? null;
          applicantBiometric.iris = biometricReq.iris ?? applicantBiometric.iris ?? null;

          applicantBiometric.applicant = applicant;
          try{
            return await this.applicantBiometricRepository.save(applicantBiometric);
          }catch(err){
              throw err;
          }
          
      }

    async getBiometric(applicantId: number){
      let applicant = await this.applicantRepository.findOneBy({applicantId})
      //if applicant not present throw user not found error
      if(applicant == null){
        throw new HttpException('User not found', 400);
      }
      
      let applicantBiometric = await this.applicantBiometricRepository.findOne(
          {where: { applicant : {applicantId : (await applicant).applicantId}},
      });

      if(applicantBiometric != null){
        return applicantBiometric;
      }else{
        throw new HttpException("No data found", 400)
      }      
    }

    /**
     * Get document on the basis of type
     * @param applicantId 
     * @param documentType 
     */
    async getApplicantDocumentByType(applicantId: number, documentType: string){
      let applicant = await this.applicantRepository.findOneBy({applicantId})
      //if applicant not present throw user not found error
      if(applicant == null){
        throw new HttpException('User not found', 400);
      }
      
      let applicantDocument = await this.applicantDocumentRepository.findOne(
          {where: { applicant : {applicantId : (await applicant).applicantId}},
      });

      if(applicantDocument != null){
        if(documentType == "ADF"){
          delete applicantDocument['photo'];
          delete applicantDocument['uuid'];
          delete applicantDocument['aadharBack'];
        }else if(documentType == "ADB"){
          delete applicantDocument['photo'];
          delete applicantDocument['uuid'];
          delete applicantDocument['aadharFront'];
        }else if(documentType == "PH"){        
          delete applicantDocument['uuid'];
          delete applicantDocument['aadharFront'];
          delete applicantDocument['aadharBack'];
        }else if(documentType == "UUID"){        
          delete applicantDocument['photo'];
          delete applicantDocument['aadharFront'];
          delete applicantDocument['aadharBack'];
        }else if(documentType == "ADF-ADB"){        
          delete applicantDocument['photo'];   
          delete applicantDocument['uuid'];       
        }
        return applicantDocument;
      }else{
        throw new HttpException("No data found", 400)
      }     
    }

    /**
     * Upload documents
     * @param applicantId 
     * @param documentReq 
     * @returns 
     */
    async insertApplicantDocumentByType(applicantId: number, documentReq: DocumentReq){
  
      let applicant = await this.applicantRepository.findOneBy({applicantId})
          
      //if applicant not present throw user not found error
      if(applicant == null){
        throw new HttpException('User not found', 400);
      }

      
      let applicantDocument = await this.applicantDocumentRepository.findOne(
        {where: { applicant : {applicantId : (await applicant).applicantId}},
      });
      if(applicantDocument == null){
        applicantDocument = new ApplicantDocument();
      }      
      applicantDocument.photo = documentReq.photo ?? applicantDocument.photo ?? "";
      applicantDocument.uuid = documentReq.uuid ?? applicantDocument.uuid ?? "";
      applicantDocument.aadharFront = documentReq.aadharFront ?? applicantDocument.aadharFront ?? "";
      applicantDocument.aadharBack = documentReq.aadharBack ?? applicantDocument.aadharBack ?? "";
      applicantDocument.applicant = applicant;      
      let response = await this.applicantDocumentRepository.save(applicantDocument);  
      if(response != null){
        return {
          status: true,
          message: "Uploaded successfully"
        }
      }else{
        throw new HttpException("Error in upload ", 400);
      }    
    }
}
