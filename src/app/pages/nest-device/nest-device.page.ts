import { Component, OnInit } from '@angular/core';
import { UserData } from '@app/providers/user-data';
import { NestService } from './nest.service';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { Browser} from '@capacitor/core';

@Component({
  selector: 'app-nest-device',
  templateUrl: './nest-device.page.html',
  styleUrls: ['./nest-device.page.scss'],
})
export class NestDevicePage  {

 isSignedIn = false;
 userId: null;
 isNestSignedIn = false;
 deviceList: Array<any>;
 private baseUrl = environment.baseUrl;

  constructor(private userData: UserData,
    private router: Router,
    private nestService: NestService,
    ) { }


  ionViewWillEnter(){
    this.getUserInfo();
  }

  getUserInfo(){
   this.userData.getUserData().then(user => {
     this.userId = user['userId'];
     this.nestAuthCheck(this.userId);
   })
  }

  nestAuthCheck(userId){
    this.nestService.nestAuthCheck(userId).subscribe(userId => {
      if(userId){
        this.isNestSignedIn = true;
        this.getDeviceList();
      }else{
        this.nestLogin();
      }
    }, err => {
      this.nestLogin()
    })
  }

  nestLogin(){
    this.nestService.nestLogin(this.userId).subscribe(res => {
      console.log(res);
      this.openUrl(res);
    }, err => {
      console.log(err);
    })

  }

  openUrl(redirectUrl) {
    // this.iab.create(redirectUrl, '_system');
    Browser.open({url: redirectUrl, windowName: '_system'})
    this.router.navigateByUrl('/dashboard');
  }

  getDeviceList(){
   
    this.nestService.getDeviceList(this.userId).subscribe(res => {
      this.deviceList =  res.devices;
    })
  }

  getDeviceDetails(deviceIdPath: string) {
    const deviceId = deviceIdPath.split("/devices/")[1];
    this.router.navigate([`/nest-device/device-details/${deviceId}`]);
  }

  generateDeviceName(value){
    return value.replace("sdm.devices.types.","");
  }
}
