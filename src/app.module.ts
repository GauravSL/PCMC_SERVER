import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import * as OpenApiValidator from 'express-openapi-validator';
import { join } from 'path';
import { OpenApiExceptionFilter } from './error/filter/open-api-exception-filter';
import { LoggerInterceptor } from './network/interceptor/logger.interceptor';
import { TypeOrmModule} from '@nestjs/typeorm';
import { LoginModule } from './modules/login/login.module';
import { DataSource } from 'typeorm';
import { User } from './repository/user.entity';
import { ApplicantModule } from './modules/applicant/applicant.module';
import { Applicant } from './repository/applicant_master.entity';
import { Certificate } from './repository/certificate.entity';
import { Ward } from './repository/ward_master.entity';
import { Zone } from './repository/zone_master.entity';
import { ZoneWardModule } from './modules/zone-ward/zone-ward.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // To use .env file
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'prasad@123',
      database: 'db_pcmc_handicap_certificate',
      entities: [User, Applicant, Certificate, Zone, Ward],
      synchronize: true,
    }), LoginModule, ApplicantModule, ZoneWardModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: OpenApiExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ...OpenApiValidator.middleware({
          apiSpec: join(__dirname, './openapi/air-service.yaml'),
          validateRequests: {
            allowUnknownQueryParameters: true,
            coerceTypes: false,
          },
          validateResponses: false,
          validateFormats: 'full',
        }),
      )
      .forRoutes('*');
  }
}
