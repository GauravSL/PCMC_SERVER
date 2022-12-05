import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from 'src/repository/user.entity';
import { LoginReq } from './dto/login.res';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly service: LoginService){}

    @Post('/')
    @HttpCode(200)
    login(@Body() reqbody: LoginReq){
        return this.service.doLogin(reqbody);
    }

    @Post('/create')
    @HttpCode(200)
    create(@Body() user: User){
        return this.service.doRegister(user);
    }
}
