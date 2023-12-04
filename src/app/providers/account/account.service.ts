// External
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment as ENV } from '@environments/environment';
import { Storage } from '@ionic/storage';

// Internal


@Injectable()
export class AccountService {
    private baseUrl: string = ENV.baseUrl;

    constructor(private http: HttpClient, private storage: Storage) {

    }

    
    // registerWebUser(user: Object, locationName: string) {
    //     // url
    //     const url: string = this.baseUrl + '/api/Account/RegisterNewLocation/' + locationName;

    //     return this.http.post(url, user).pipe(
    //         map((res: any) => {
    //             return res;
    //         })
    //     );
    // }

    // registerResidentUser(user: Object, locationId: string) {
    //   // url
    //   const url: string = this.baseUrl + '/api/Account/RegisterResidentUser/' + locationId;

    //   return this.http.post(url, user).pipe(
    //     map((res: any) => {
    //       return res;
    //     })
    //   );
    // }

    // sendResidentInvite(invite: Object) {
    //   let url: string = this.baseUrl + `/api/Account/SendInviteEmail`;

    //   return this.http.post(url, invite).pipe(
    //     map((res: any) => {
    //       return res;
    //     })
    //   )
    // }

    // loginWebUser(user: Object) {
    //     // url
    //     const url: string = this.baseUrl + '/api/Account/LoginWeb';

    //     return this.http.post(url, user).pipe(
    //         map((res: any) => {
    //             return res;
    //         })
    //     );
    // }

    getManagementUser() {
        let url: string = this.baseUrl + `/api/Account/GetManagementUser`;

        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getEmployeeDetails(userId: string) {
      let url: string = this.baseUrl + `/api/Account/GetEmployeeDetails/${userId}`;

      return this.http.get(url).pipe(
        map((res: any) => {
          return res;
        })
      );
    }

    getAdminLocationDetails(adminUserId: string) {
      let url: string = this.baseUrl + `/api/Account/GetAdminLocationDetails/${adminUserId}`;

      return this.http.get(url).pipe(
        map((res: any) => {
          return res;
        })
      );
    }

    checkEventbriteLink() {
        let url: string = this.baseUrl + `/api/Account/CheckEventbriteLinked`;

        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    loginEventbrite() {
        let url: string = this.baseUrl + `/api/Event/EventbriteLogin`;

        return this.http.get(url, {responseType: 'text'}).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    uploadprofileimages(images: Array<any>, userId: string){
      let url: string = this.baseUrl + `/api/account/userPhotoUpload/`+ userId;
      const formData =  new FormData();
      for (let index = 0; index < images.length; index++) {
        const element = images[index];
        formData.append('uploadedImages', element);
        this.storage.set('profile64',element);
      }
      return this.http.post(url, formData, {responseType: 'text'}).pipe(
          map((res: any) => {
              return res;
          })
      );
    }

    locationAlertDetectSubscription(data: any) {
      let url: string = this.baseUrl + `/api/account/AlertSubscriptionCreate`;
      const body = data;
      return this.http.post(url, body, {responseType: 'text'}).pipe(
          map((res: any) => {
              return res;
          })
      );
  }

  getAlertSubscription(userId: string) {
    let url: string = this.baseUrl + `/api/account/GetAlertSubscription/${userId}`;

    return this.http.get(url).pipe(
        map((res: any) => {
            return res;
        })
    );
}

}
