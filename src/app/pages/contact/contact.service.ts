import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) { }

  getContact() {
    let url: string = this.baseUrl + `/api/Contact/GetContacts`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
