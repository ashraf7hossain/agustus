// External
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment as ENV } from '@environments/environment';

// Internal


@Injectable()
export class MessageService {
  private baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) {

  }

  sendGroupMessage(message: Object) {
    let url: string = this.baseUrl + `/api/Message/AddGroupMessage`;

    return this.http.post(url, message, { responseType: "text" }).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  addMessageGroup(group: Object, userOne: string, userTwo: string) {
    let url: string = this.baseUrl + `/api/Message/AddMessageGroup/${userOne}/${userTwo}`;

    return this.http.post(url, group).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  addMessageGroupUser(user: Object) {
    let url: string = this.baseUrl + `/api/Message/AddMessageGroupUser`;

    return this.http.post(url, user, { responseType: "text" }).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getUserMessageGroups(userId: string) {
    let url: string = this.baseUrl + `/api/Message/GetUserMessageGroups/${userId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getGroupMessages(groupId: string) {
    let url: string = this.baseUrl + `/api/Message/GetGroupMessages/${groupId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getResidentMessageUsers(locationId: string) {
    let url: string = this.baseUrl + `/api/Message/GetResidentMessageUsers/${locationId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getEmployeeMessageUsers(locationId: string) {
    let url: string = this.baseUrl + `/api/Message/GetEmployeeMessageUsers/${locationId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
}
