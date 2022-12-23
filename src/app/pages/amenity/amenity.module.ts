import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmenityPageRoutingModule } from './amenity-routing.module';

import { AmenityPage } from './amenity.page';
import { AmenityDetailComponent } from './amenity-detail/amenity-detail.component';
import { AmenitiesService } from './amenities.service';
import { AmenityReservationComponent } from './amenity-reservation/amenity-reservation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AmenityPopoverComponent } from './amenity-popover/amenity-popover.component';
import { AmenityReservationListComponent } from './amenity-reservation-list/amenity-reservation-list.component';
import { CheckoutComponent } from '@app/providers/checkout/checkout.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AmenityPageRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    declarations: [AmenityPage, AmenityDetailComponent, AmenityReservationComponent, AmenityPopoverComponent, AmenityReservationListComponent, CheckoutComponent],
    providers: [AmenitiesService]
})
export class AmenityPageModule { }
