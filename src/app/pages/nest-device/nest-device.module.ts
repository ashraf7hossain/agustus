import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NestDevicePageRoutingModule } from './nest-device-routing.module';

import { NestDevicePage } from './nest-device.page';
import { NestService } from './nest.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NestDeviceDetailsComponent } from './nest-device-details/nest-device-details.component';
import { ThermostatSettingsModalComponent } from './thermostat-settings-modal/thermostat-settings-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    NestDevicePageRoutingModule,
  ],
  declarations: [NestDevicePage, NestDeviceDetailsComponent, ThermostatSettingsModalComponent],
  providers: [NestService]
})
export class NestDevicePageModule {}
