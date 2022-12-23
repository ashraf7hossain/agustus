import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NestDeviceDetailsComponent } from './nest-device-details/nest-device-details.component';

import { NestDevicePage } from './nest-device.page';

const routes: Routes = [
  {
    path: '',
    component: NestDevicePage
  },
  {
    path: 'device-details/:id',
    component: NestDeviceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NestDevicePageRoutingModule {}
