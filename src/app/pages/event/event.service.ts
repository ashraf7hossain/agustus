// External
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment as ENV } from '@environments/environment';

// Internal


@Injectable()
export class EventService {
  
  private baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) {

  }

  getLocationEvent(locationId: string) {
    let url: string = this.baseUrl + `/api/Event/GetLocationEvents/${locationId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getEventDetails(eventId: string) {
    let url: string = this.baseUrl + `/api/Event/GetEventDetails/${eventId}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addEventAttendee(eventAttendee: Object) {
    const url: string = this.baseUrl + `/api/Event/AddEventAttendee`;
    const body = {
      eventAttendee
    };
    return this.http.post(url, body, {responseType: 'text'}).pipe(
      map((res: any) => {
        return res;
      })
    );


  }

  
  
}
