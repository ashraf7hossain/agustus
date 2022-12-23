import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardPage } from './card';

const routes: Routes = [
  {
    path: '',
    component: CardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardPageRoutingModule { }
