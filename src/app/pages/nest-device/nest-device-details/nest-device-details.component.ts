import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '@app/providers/user-data';
import { ModalController } from '@ionic/angular';
import { NestService } from '../nest.service';
import { ThermostatSettingsModalComponent } from '../thermostat-settings-modal/thermostat-settings-modal.component';

@Component({
  selector: 'app-nest-device-details',
  templateUrl: './nest-device-details.component.html',
  styleUrls: ['./nest-device-details.component.scss'],
})
export class NestDeviceDetailsComponent implements OnInit {

  deviceId: string;
  userId: string;
  nestDevice: Object;
  constructor(private router: Router, private nestService: NestService,
    private userData: UserData, private activeRoute: ActivatedRoute,
    private modalCtl: ModalController
  )
  {
     this.deviceId = this.activeRoute.snapshot.params.id;
    
  }

  ngOnInit() {
    this.getUserId();
   }
  
  getUserId() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
      this.getDeviceDetails();
    })
  }

  getDeviceDetails() {
    this.nestService.getDeviceDetails(this.userId, this.deviceId).subscribe(res => {
      this.nestDevice = res;
    });
  }

  async thermostatSettingModal(type, availableModes=['ON', 'OFF']) {
    
    const settingsObject = this.generateSettingObj(type, availableModes)
    const modal = await this.modalCtl.create({
      component: ThermostatSettingsModalComponent,
      componentProps: { settingsObject }
    });
    modal.onDidDismiss().then(val => {
      if (val.data) {
        this.getDeviceDetails();
      }
    })
    await modal.present();
    
  }

  cameraEventImage() {
    const eventId = "0120ecc7-3b57-4eb4-9941-91609f189fb4";
    const payload = {
      command : "sdm.devices.commands.CameraEventImage.GenerateImage",
      params : {
         "eventId": eventId
       }
    }

    this.nestService.getCameraEventImage(this.userId, this.deviceId, payload).subscribe(res => {
      console.log(res);
    })
    
  }

  generateSettingObj(type, availableModes) {

    switch (type) {
      case "Fan":
        return ({
          userId: this.userId,
          deviceId: this.deviceId,
          title: 'Set Fan Mode',
          command: 'sdm.devices.commands.Fan.SetTimer',
          params: {
            "timerMode": "",
            "duration": "3600s"
          },
    
          inputFields: [
            {
              type: 'text',
              name: 'Duration',
              key: 'duration',
              optional: true,
    
            },
            {
              type: 'select',
              name: 'Timer Mode',
              key: 'timerMode',
              list: availableModes
    
            },
          ],
        });
        
        break;
      
        case "ThermostatEco":
          return {
            userId: this.userId,
            deviceId: this.deviceId,
            title: 'Set ThermostatEco',
            command: 'sdm.devices.commands.ThermostatEco.SetMode',
            params : {
              "mode" : ""
            },
      
            inputFields: [
              
              {
                type: 'select',
                name: 'Mode',
                key: 'mode',
                list: availableModes
      
            },
            ],
          }
          
        break;
      
        case "ThermostatMode":
          return {
            userId: this.userId,
            deviceId: this.deviceId,
            title: 'Set ThermostatMode',
            command: 'sdm.devices.commands.ThermostatMode.SetMode',
            params : {
              "mode" : ""
            },
      
            inputFields: [
              
              {
                type: 'select',
                name: 'Mode',
                key: 'mode',
                list: availableModes
      
            },
            ],
          }
          
        break;
        case "ThermostatTemperatureSetpoint":
          return ({
            userId: this.userId,
            deviceId: this.deviceId,
            title: 'Set ThermostatTemperatureSetpoint',
            command: 'sdm.devices.commands.ThermostatTemperatureSetpoint.SetRange',
            params: {
              "coolCelsius": availableModes[0],
              "heatCelsius": availableModes[1],
            },
      
            inputFields: [
              {
                type: 'text',
                name: 'CoolCelsius',
                key: 'coolCelsius',
      
              },
              {
                type: 'text',
                name: 'HeatCelsius',
                key: 'heatCelsius'
      
              },
             
            ],
          });
    
      default:
        break;
    }
    
  }

}
