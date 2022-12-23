import { HttpClient, HttpParams } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { environment } from "@environments/environment";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-card",
  templateUrl: "card.html",
  styleUrls: ["./card.scss"],
})
export class CardPage {
  signupForm: FormGroup;
  userEmail: string;
  userImage: string;

  constructor(private storage: Storage, private http: HttpClient) {}

  ngOnInit(): void {
    let data: any = {
        cardnumber: "",
        userpin: "123",
        expmonth: "",
        expyear: "",
        cvc: ""
    };
    this.signupForm = new FormGroup({
        useremail: new FormControl(""),
        userpassword: new FormControl(""),
        userpin: new FormControl(""),
        cardnumber: new FormControl(""),
        expmonth: new FormControl(""),
        expyear: new FormControl(""),
        cvc: new FormControl(""),
      });
    this.storage.get('cardInfo').then(res => {
        data = JSON.parse(res);
        this.signupForm.controls.cardnumber.setValue(data.card_number)
        this.signupForm.controls.userpin.setValue(data.pin)
        this.signupForm.controls.expmonth.setValue(data.expire_month)
        this.signupForm.controls.expyear.setValue(data.expire_year)
        this.signupForm.controls.cvc.setValue(data.cvc)

        console.log("storage response ",data.cardnumber);

    });
    this.storage.get('username').then((res)=>{
      console.log(res);
      this.userEmail = res;
    });
    this.storage.get('profileImageId').then((res) =>{
      console.log(res);
      this.userImage = "http://23.119.176.135:2288/api/ProfileFile/"+res;
    })
    // data = await this.storage.get('cardInfo');
    
    
    this.storage.get("profile").then((res) => {
    //   console.log(res);
    });
  }

  signUp(): void {
    const data = {
      email: this.userEmail,
      original_img: this.userImage,
      full_name: "",
      card_number: this.signupForm.value.cardnumber,
      expire_month: this.signupForm.value.expmonth,
      expire_year: this.signupForm.value.expyear,
      cvc: this.signupForm.value.cvc,
      pin: this.signupForm.value.userpin,
    };
    console.log(data);

    let httpData = this.httpMaker(data);

    this.storage.remove("cardInfo");
    this.storage.set("cardInfo", JSON.stringify(data)).then((res) => {
      console.log(res);
    });

    this.http.post(`${environment.ngRok}/register`,httpData).subscribe((res)=>{
      console.log(res);
    })
    
    
  }

  httpMaker(data: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(data).forEach((key) => {
      httpParams = httpParams.set(key, data[key]);
    });
    // console.log(httpParams);
    return httpParams;
  }
}
