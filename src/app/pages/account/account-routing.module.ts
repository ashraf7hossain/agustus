import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountPage } from './account';
import { ProfileImageComponent } from './profile-image/profile-image.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: 'profileImage',
    component: ProfileImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPageRoutingModule { }
