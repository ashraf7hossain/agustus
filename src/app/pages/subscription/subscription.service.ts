import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as ENV } from "@environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SubscriptionService {
  private baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) {}

  createSubscribeCustomer(residentUserId: string, email: string) {
    let url: string = this.baseUrl + `/api/Payments/CreateCustomer`;
    let body = {
      ResidentSubscription: { residentUserId },
      email
    };

    return this.http.post(url, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getSubscribeCustomer(residentUserId: string) {
    let url: string =
      this.baseUrl + `/api/Payments/SubscribeCustomer/${residentUserId}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  createSubscriptionPaymentIntent(priceId: string, customerId: string) {
    let url: string =
      this.baseUrl + `/api/Payments/CreateSubscriptionPaymentIntent`;
    let body = {
      priceId,
      customerId
    };

    return this.http.post(url, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
