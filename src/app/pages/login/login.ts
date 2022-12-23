import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "../../providers/user-data";

import { UserOptions } from "../../interfaces/user-options";
import { Auth } from "../../providers/auth";
import { SubscriptionService } from "../subscription/subscription.service";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"]
})
export class LoginPage {
  mode: string;
  baseUrl: string;

  login: UserOptions = {
    email: "tahmina@augustusapp.com",
    password: "Bigmoney1"
  };
  submitted = false;
  isLoading = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private auth: Auth,
    private subscriptionService: SubscriptionService
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.isLoading = true;
      this.auth.login(this.login.email, this.login.password).then(response => {
        this.userData.login(this.login.email, response);
        this.getResidentLocationWithProfileImage(response['userId']);
     
        this.getUserSubscription(response["userId"]);
      
      }, er => {
        this.isLoading = false;
      });
    }
  }

  getResidentLocationWithProfileImage(userId) {
    this.auth.getResidentLocationWithProfileImage(userId).subscribe(res => {

      if (res.profileImageId) {
        this.userData.setUserProfileImageId(res.profileImageId)   
      }
      this.userData.setUserResidentLocationId(res.locationId)
      this.isLoading =  false;
      this.router.navigateByUrl('/dashboard');
    })
  }

  onSignup() {
    this.router.navigateByUrl("/signup");
  }

  getUserSubscription(userId: string) {
    this.subscriptionService.getSubscribeCustomer(userId).subscribe(res => {
      this.userData.setUserSubscription(res);
    });
  }
}
