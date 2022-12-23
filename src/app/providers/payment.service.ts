import { Injectable } from "@angular/core";
import { environment as ENV } from "@environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  baseUrl: string = ENV.baseUrl;

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number): Observable<any> {
    const apiUrl = this.baseUrl + "/api/Payments/CreatePaymentIntent";
    const body = { amount };

    return this.http.post(apiUrl, body).pipe(map((res) => res));
  }
}
