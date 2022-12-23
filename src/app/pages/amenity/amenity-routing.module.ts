import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmenityDetailComponent } from './amenity-detail/amenity-detail.component';
import { AmenityReservationListComponent } from './amenity-reservation-list/amenity-reservation-list.component';
import { AmenityReservationComponent } from './amenity-reservation/amenity-reservation.component';

import { AmenityPage } from './amenity.page';

const routes: Routes = [
  {
    path: '',
    component: AmenityPage
  },
  {
    path: 'details/:amenityId',
    component: AmenityDetailComponent
  },
  {
    path: 'reservationList',
    component: AmenityReservationListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmenityPageRoutingModule { }
