// External
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment as ENV } from '@environments/environment';

// Internal

interface AmenityPost {
  amenity: Object;
  image: string;
}

@Injectable()
export class AmenitiesService {

  private baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) {

  }

  addAmenity(amenity: Object, image: string) {
    let url: string = this.baseUrl + `/api/Amenity/AddAmenity`;

    let body: AmenityPost = {
      amenity: amenity,
      image: image
    }

    return this.http.post(url, body, { responseType: "text" }).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getLocationAmenities(locationId: string) {
    let url: string = this.baseUrl + `/api/Amenity/GetLocationAmenities/${locationId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getReservedAmenities(userId: string, locationId: string, serachStartTime: string) {
    let url: string = this.baseUrl + `/api/Amenity/GetLocationAmenityReservations/${userId}/${locationId}/${serachStartTime}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAmenity(amenityId: string) {
    let url: string = this.baseUrl + `/api/Amenity/GetAmenity/${amenityId}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addAmenityReservation(reservation: object) {
    let url: string = this.baseUrl + `/api/Amenity/AddAmenityReservation`;

    return this.http.post(url, reservation, { responseType: "text" }).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getAmenityReservationsByDate(amenityId: string, startTime, endTime) {
    let url: string = this.baseUrl + `/api/Amenity/GetAmenityReservationsByDate/${amenityId}/${startTime}/${endTime}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


}
