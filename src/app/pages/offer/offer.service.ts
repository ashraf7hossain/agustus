import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class OfferService {

  private baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) { }

  getOffers(locationId: string, userId: string) {
    let url: string = this.baseUrl + `/api/Offer/GetOffersByLocation/${locationId}/${userId}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getOffersDetails(offerId: string, userId: string) {
    let url: string = this.baseUrl + `/api/Offer/OfferDetailsWithRedemption/${offerId}/${userId}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
