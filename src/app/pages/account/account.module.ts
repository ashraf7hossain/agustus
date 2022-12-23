import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountService } from '@app/providers/account/account.service';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountPageRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AccountPage,
    ProfileImageComponent
  ],
  providers:[
    AccountService
  ]
})
export class AccountModule { }
