import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class VisitorService {

  private baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) { }

  getVisitor(userId: string, locationId: string) {
    let url: string = this.baseUrl + `/api/Visitor/VisitorList/${userId}/${locationId}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addVisitor(visitor: Object) {
    const url: string = this.baseUrl + `/api/Visitor/AddVisitor`;
    const body = {
      visitor
    };
    return this.http.post(url, body, { responseType: 'text' }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
