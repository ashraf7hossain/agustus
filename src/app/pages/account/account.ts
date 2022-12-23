import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, Platform } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { UserData } from '../../providers/user-data';
import { AccountService } from '@app/providers/account/account.service';
import { environment } from '@environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';



@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit  {
  username: string;
  imageUrl: string;
  baseUrl = environment.baseUrl;
   avatarUrl = 'https://www.gravatar.com/avatar?d=mm&s=140';
   predictedAges = [];
   alertSubscription = false;
   isToggleFocused = false;
   userId: string;
   locationId: string;
  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    private plt: Platform,
    private http: HttpClient,
    private storage: Storage,
    private accountService: AccountService
  ) { 

  }

  stripe_customer_id:string = "";

  
  async ngOnInit(){
    this.getUserId();
    this.getUserLocationId();

    
    let email = await this.storage.get('username');
    let data = new HttpParams().set('email',email);
    this.http.post(`${environment.ngRok}/get`,data).subscribe((res : any)=>{
      this.storage.set('stripe_user',JSON.stringify(res.user));
      this.stripe_customer_id = res.user.stripe_customer_id;
    });
    
  }
  
  ionViewWillEnter(){    
    this.getUsername();
    this.getProfileImageId();
   
  }
  
 async  getProfileImageId() {
   const profileImageId = await this.userData.getProfileImageId();
   this.avatarUrl = profileImageId ? this.baseUrl + '/api/ProfileFile/'+ profileImageId : this.avatarUrl;
   console.log(this.avatarUrl);
   
  }

  

 
 

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;      
    });
  }

  getUserId(){
    this.userData.getUserData().then((profile) => {
      this.userId = profile.userId;  
      this.getAlertSubscription();    
    });
  }
 async getUserLocationId(){
  this.locationId = await this.userData.getUserResidentLocationId();
  }


  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }

  profileImage(){
    this.router.navigateByUrl('profileImage');
  }
  onAlertSubscription(event){

    this.alertSubscription =  event.detail.checked
   if (this.isToggleFocused) {
     const reqData = { 
      locationId: this.locationId,    
      residentUserId: this.userId,
      isSubscribe: this.alertSubscription
     };
     this.accountService.locationAlertDetectSubscription(reqData).subscribe(res => {
      }); 
   }
  }
  onIonFocus(event){
   this.isToggleFocused =  true;
  }
  getAlertSubscription(){
      this.accountService.getAlertSubscription(this.userId).subscribe(res => {
        if(res){
          this.alertSubscription = res.isSubscribe;
        }
      }) 
  }
}