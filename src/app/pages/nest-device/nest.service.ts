// External
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { environment as ENV } from '@environments/environment';


// Internal


@Injectable()
export class NestService {
  
  private baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) {

  }

  
  nestLogin(userId: string) {
    let url: string = this.baseUrl + `/api/SmartHome/NestLogin/${userId}`;
    return this.http.get(url, {responseType: 'text'}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  nestAuthCheck(userId: string) {
    let url: string = this.baseUrl + `/api/SmartHome/GetNestUserDetails/${userId}`;
    return this.http.get(url, {responseType: 'text'}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getDeviceList(userId): Observable<any>{
 
    let url: string = this.baseUrl + `/api/SmartHome/GetNestDevices/${userId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getDeviceDetails(userId: string, deviceId: string): Observable<any>{
 
    let url: string = this.baseUrl + `/api/SmartHome/GetNestDeviceDetails/${userId}/${deviceId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  changeDeviceSetting(userId: string, deviceId: string, payload: object): Observable<any>{
 
    let url: string = this.baseUrl + `/api/SmartHome/ChangeDeviceSetting/${userId}/${deviceId}`;

    return this.http.post(url, payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCameraEventImage(userId: string, deviceId: string, payload: object): Observable<any>{
 
    let url: string = this.baseUrl + `/api/SmartHome/GetCameraEventImage/${userId}/${deviceId}`;

    return this.http.post(url, payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

 



  
  
}
