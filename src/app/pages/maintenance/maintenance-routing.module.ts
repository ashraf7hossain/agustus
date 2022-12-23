import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRequestComponent } from './add-request/add-request.component';

import { MaintenancePage } from './maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePage
  },
  {
    path: 'new-request',
    component: AddRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePageRoutingModule {}
