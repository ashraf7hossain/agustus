// External
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment as ENV } from '@environments/environment';
@Injectable()
export class MaintenanceService {

  private baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) { }

  getLocationMiantenanceDetails(locationId) {
    let url: string = this.baseUrl + `/api/Maintenance/GetLocationMaintenanceDetails/${locationId}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addMaintenanceDetails(maintenance: Object, image: any) {
    const url: string = this.baseUrl + `/api/Maintenance/AddMaintenanceDetails`;
    const body = {
      maintenance: maintenance,
      image: image
    };
    return this.http.post(url, body, { responseType: 'text' }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addRatingToMaintenance(maintenance: Object) {
    const url: string = this.baseUrl + `/api/Maintenance/AddRating`;
    const body = {
      maintenance: maintenance,
    };
    return this.http.post(url, body, { responseType: 'text' }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  sendMaintenanceComment(maintenanceComment: Object) {
    let url: string = this.baseUrl + `/api/Maintenance/AddComment`;

    return this.http.post(url, maintenanceComment, { responseType: "text" }).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getMaintenanceComments(maintenanceId: string) {
    let url: string = this.baseUrl + `/api/Maintenance/GetComments/${maintenanceId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
