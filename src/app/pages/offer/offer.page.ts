import { Component, OnInit } from '@angular/core';
import { UserData } from '@app/providers/user-data';
import { environment } from '@environments/environment';
import * as moment from 'moment';
import { OfferService } from './offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  offerList: Array<any>;
  offerType = "publish";
  filteredOfferList: Array<any>;
  locationId: string;
  userId: string;
  private baseUrl = environment.baseUrl;

  constructor(private offerService: OfferService, private userData: UserData) { }

  ngOnInit() {
    this.getUserLocation();

  }

  async getUserLocation() {
    const { userId }= await this.userData.getUserData()
    this.userId =  userId;
    this.locationId = await this.userData.getUserResidentLocationId();
    if (this.locationId && userId) {
      this.getOfferList(this.locationId, userId);
    }
  }


  getOfferList(locationId, userId) {
    this.offerService.getOffers(locationId, userId).subscribe(offerList => {
      this.offerType = 'publish';
      this.offerList = offerList;
      this.filteredOfferList = offerList ? offerList.filter(obj => obj.status === 'publish' && this.isValidDate(obj.startDate, obj.endDate)) : [];
    })
  }

  isValidDate(startDate, endDate){
    const currentDate =  moment();
    return moment(currentDate).isBetween(startDate, endDate, 'days', "[]");
  }

  segmentChanged(event) {
    this.offerType = event.target.value;
    this.filteredOfferList = this.offerList ? this.offerList.filter(obj => obj.status === this.offerType) : [];
  }

  offerVlidationStatus(offerData){
    const currentDate =  moment();
    const isNotExpired = moment(currentDate).isBetween(offerData.startDate, offerData.endDate, 'days', "[]");
    const isRedemLimitOut = offerData.offerRedemption && offerData.offerRedemLimit <= offerData.offerRedemption.redemTotal ? true : false;
    const invalidText = !isNotExpired ? 'Offer has expired' : isRedemLimitOut ? 'OfferRedemption has limit out' : null;
    return invalidText ? invalidText : 'Live';
  }

}
