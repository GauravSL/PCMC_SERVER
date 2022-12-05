import {
    CallHandler,
    ExecutionContext, 
    Injectable,
    Logger,
    NestInterceptor
} from "@nestjs/common";
import { catchError, Observable, tap } from "rxjs";
import { Request, Response } from "express";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggerInterceptor.name);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const startTime = Date.now();
        let endTime;
        let resTime;
        const sessionId = "SessionId: " + JSON.stringify(request.headers['saa-session-id']);
        const reqPath = "path: " + request.path;
        const reqHeader = JSON.stringify(request.headers);
        const reqBody = JSON.stringify(request.body);
    
        this.logger.log(`---> ${sessionId}    ${request.method}    ${reqPath} `);
        this.logger.debug(`---> ${sessionId}    Request Header: ${reqHeader}`);
        
        if(reqBody != '{}'){
            this.logger.debug(`---> ${sessionId}    Request Body: ${reqBody}`);
        } 
        
        const header: Response = context.switchToHttp().getResponse();
        const resHeader = "Response Header: " + JSON.stringify(header.getHeaders());
       
        return next.handle().pipe(
            
            catchError((err) => {
                endTime = Date.now();
                resTime = endTime - startTime;
                this.logger.log(`<--- ${sessionId}    ${request.method}    ${reqPath}   Response Time: ${resTime}ms`);
                this.logger.debug(`<--- ${sessionId}    ${resHeader}`);
                this.logger.debug(`<--- ${sessionId}    Response Error: ${JSON.stringify(err.response.data)}`);
                this.logger.log(`<--- ${sessionId}    ${reqPath}    Status code: ${err.response.status}`);
                throw err;
            }),
            
            tap((data) => {
                const resBody = JSON.stringify(data);
                endTime = Date.now();
                resTime = endTime - startTime
                this.logger.log(`<--- ${sessionId}    ${request.method}    ${reqPath}   Response Time: ${resTime}ms`);
                this.logger.debug(`<--- ${sessionId}    ${resHeader}`);            
                this.logger.debug(`<--- ${sessionId}    Response Body: ${resBody}`);
                this.logger.log(`<--- ${sessionId}    ${reqPath}    Status code: ${response.statusCode}`);
            }),    
        );
    }
}