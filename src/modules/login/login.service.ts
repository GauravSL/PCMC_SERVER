import { LoginReq } from './dto/login.res';
import  * as InjectRepo from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/repository/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
    
    constructor(
        @InjectRepo.InjectRepository(User) private usersRepository: Repository<User>
      ) {}

    doLogin(reqbody: LoginReq){
       // const queryRunner = this.dataSource.createQueryRunner();
        return "Login successfully"
    }

    async doRegister(user: User){
        this.usersRepository.save(user);
        return "Created"
        // const queryRunner = this.dataSource.createQueryRunner();
        // await queryRunner.connect();
        // await queryRunner.startTransaction();
        // try{
        //     await queryRunner.manager.save(user);
        //     await queryRunner.commitTransaction();
        //     return "Registered successfully";
        // }catch(err){
        //     // since we have errors lets rollback the changes we made
        //     console.log(err);
        //     await queryRunner.rollbackTransaction();
        //     return JSON.stringify(err);
        // }finally{
        //     await queryRunner.release();
        // }

    }
}

