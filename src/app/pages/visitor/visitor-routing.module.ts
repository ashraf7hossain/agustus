import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateVisitorComponent } from './create-visitor/create-visitor.component';

import { VisitorPage } from './visitor.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorPage
  },
  {
    path: 'create',
    component: CreateVisitorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorPageRoutingModule { }
