import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '@app/providers/user-data';
import { environment } from '@environments/environment';
import { OfferService } from '../offer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent implements OnInit {

  offerData: any;
  offerId: string;
  userId: string;
  private baseUrl = environment.baseUrl;
  qrData = null;
  createdCode = null;
  redemptionInvalidationText =  null;

  constructor(private offerService: OfferService, private activatedRoute: ActivatedRoute, private userData: UserData) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(param => {
       this.offerId = param.offerId;
      this.getUserId();
     
     
    })
  }

  
  async getUserId() {
    const {userId} =  await this.userData.getUserData();
    this.userId =  userId;
    this.getOfferDetails(this.offerId, userId);
  }
  
  getOfferDetails(offerId, userId) {
    this.offerService.getOffersDetails(offerId, userId).subscribe(offerData => {
      this.offerData = offerData;
      if(offerData  && offerData.id && offerData.status == 'publish'){
        this.createCode(offerId, this.userId);
      }
    })
  }

  createCode (offerId, userId) {
    const currentDate =  moment();
    const isNotExpired = moment(currentDate).isBetween(this.offerData.startDate, this.offerData.endDate, 'days', "[]");
    const isRedemLimitOut = this.offerData.offerRedemption && this.offerData.offerRedemLimit === this.offerData.offerRedemption.redemTotal ? true : false;
    this.redemptionInvalidationText = !isNotExpired ? 'Offer has expired' : isRedemLimitOut ? 'OfferRedemption has limit out' : null;
    this.createdCode =  this.redemptionInvalidationText ? null :  `http://23.119.176.135:2288/OfferRedemptionCallback/${offerId}/${userId}`;
  }
  
  // scanBarcode() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //    }).catch(err => {
  //    });
  // }

}
