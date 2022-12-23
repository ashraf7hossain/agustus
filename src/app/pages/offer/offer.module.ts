import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferPageRoutingModule } from './offer-routing.module';
import { OfferPage } from './offer.page';
import { OfferService } from './offer.service';
import { OfferDetailsComponent } from './offer-details/offer-details.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferPageRoutingModule,
  ],
  declarations: [OfferPage, OfferDetailsComponent],
  providers: [OfferService]
})
export class OfferPageModule { }
