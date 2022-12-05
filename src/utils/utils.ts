import { AxiosError, AxiosResponse } from "axios";

export default class Utils {
  static appendQueryParamToUrl(url, obj, headers) {
    console.log(headers);
    const reqHeaders = {
      Authorization: headers.authorization,
      'Content-Type': headers['content-type'],
      'SAA-session-id': headers['saa-session-id'],
    };

    if (Object.keys(obj).length === 0) {
      return {
        url: url,
        headers: reqHeaders,
      };
    }
    const searchParams = new URLSearchParams(obj);
    const returnUrl = `${url}?${searchParams.toString()}`;
    return {
      url: returnUrl,
      headers: reqHeaders,
    };
  }

  static generateAmadeusRequestURLAndHeaders(url, queryObj, sessionId, amadeusToken: string) {
    const reqHeaders = {
      Authorization: 'Bearer ' + amadeusToken,
      'Content-Type': 'application/json',
      'ama-client-ref': sessionId
    };
    if (Object.keys(queryObj).length === 0) {
      return {
        url: url,
        headers: reqHeaders,
      };
    }
    const searchParams = new URLSearchParams(queryObj);
    const returnUrl = `${url}?${searchParams.toString()}`;
    return {
      url: returnUrl,
      headers: reqHeaders,
    };
  }

  static transformResponse(response){
    if(response.errors?.length > 0){
      // Here we are transforming error response with staus 200.
      let customErrorRes = {
        status : 400,
        statusText : "bad request",
        data : response
      }
      response.status = 400;
      response.statusText = "bad request";
      throw new AxiosError("bad reuqest","400", null, null, customErrorRes as AxiosResponse);
    }else{
      // Here we are sending the success response.
      return response;
    }
  }
 
}
