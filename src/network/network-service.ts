import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom, map } from "rxjs";
import { LoggerInterceptor } from "./interceptor/logger.interceptor";

@Injectable()
export class NetworkService {
  constructor(private readonly httpService: HttpService) {}
  // It will call the all request from 3rd party apis

  async get(url: string, headersObj: any) {
    const observable = await this.httpService
      .get(url, { headers: headersObj })
      .pipe(map((res) => res.data));
    // you can use the data object now !!
    return await lastValueFrom(observable);
  }

  async post<Type>(url: string, data: any, headersObj: any): Promise<Type> {
    const observable = await this.httpService
      .post(url, data, { headers: headersObj })
      .pipe(map((res) => res.data));
    // you can use the data object now !!
    return await lastValueFrom(observable);
  }

  async delete<Type>(url: string, headersObj: any, data?: any): Promise<Type> {
    const observable = await this.httpService
      .delete(url, { headers: headersObj, data: data })
      .pipe(map((res) => res.data));
    // you can use the data object now !!
    return await lastValueFrom(observable);
  }

  async patch<Type>(url: string, data: any, headersObj: any): Promise<Type> {
    const observable = await this.httpService
      .patch(url, data, { headers: headersObj })
      .pipe(map((res) => res.data));
    // you can use the data object now !!
    return await lastValueFrom(observable);
  }

  async put<Type>(url: string, data: any, headersObj: any): Promise<Type> {
    const observable = await this.httpService
      .put(url, data, { headers: headersObj })
      .pipe(map((res) => res.data));
    // you can use the data object now !!
    return await lastValueFrom(observable);
  }
}
