import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserData } from '@app/providers/user-data';
import { environment } from '@environments/environment';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AmenityObject } from '../amenities.model';
import { AmenitiesService } from '../amenities.service';
import { AmenityReservationComponent } from '../amenity-reservation/amenity-reservation.component';

@Component({
  selector: 'app-amenity-detail',
  templateUrl: './amenity-detail.component.html',
  styleUrls: ['./amenity-detail.component.scss'],
})
export class AmenityDetailComponent implements OnInit {


  baseUrl = environment.baseUrl;
  weekList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  amenity: AmenityObject;
  reservedAmenities: Array<any>;
  timeRange: Array<any>;
  userId: string;
  slotStartTime;
  slotEndTime;
  serachStartTime;
  searchEndTime;
  isCurrentDate: boolean;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userData: UserData,
    private modalController: ModalController,
    private amenitiesService: AmenitiesService) { }

  ionViewWillEnter() {
    this.getAmenityDetails();
    this.checkIsCurrentDate();
  }

  ngOnInit() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
    })

  }

  getAmenityDetails() {
    const amenityId = this.activatedRoute.snapshot.params?.amenityId;
    if (amenityId) {
      this.amenitiesService.getAmenity(amenityId).subscribe(amenity => {
        this.amenity = amenity;
        this.slotStartTime = moment(this.amenity.openTime).format('hh:mm a');
        this.slotEndTime = moment(this.amenity.closeTime).format('hh:mm a');

        this.subscribeRoutedQueryParams();
      });

    }

  }

  subscribeRoutedQueryParams() {
    this.activatedRoute.queryParamMap.subscribe(paramMap => {
      const params = paramMap['params'];
      this.serachStartTime = params && params['startTime'] ? params['startTime'] : moment().format('YYYY-MM-DD');
      this.searchEndTime = moment(moment(this.serachStartTime).add(1439, 'minutes')).format('YYYY-MM-DD HH:mm:ss');
      this.getAmenityReservation();
    });
  }

  getAmenityReservation() {
    this.amenitiesService.getAmenityReservationsByDate(this.amenity.id, this.serachStartTime, this.searchEndTime).subscribe(res => {
      this.reservedAmenities = res;
      this.generateTimeRange(this.slotStartTime, this.slotEndTime);
    });
  }

  generateTimeRange(openTime, closeTime) {
    const startTime = moment(this.serachStartTime).add(moment.duration(openTime));
    const endTime = moment(this.serachStartTime).add(moment.duration(closeTime));
    const timeRange = [];
    const timeRangeLimit = moment(startTime).isSame(endTime, 'hours') ? moment(startTime).add(24, 'hours') : endTime;
    let openTimeSlot = startTime;

    while (openTimeSlot < timeRangeLimit) {
      let endTimeSlot = moment(openTimeSlot).add(1, 'hour');
      let reserverdAmenity = this.reservedAmenities.find(obj => moment(obj.startTime).isSame(openTimeSlot, 'hours'));
      if (reserverdAmenity) {
        timeRange.push(reserverdAmenity);
      } else {
        timeRange.push({ startTime: openTimeSlot, endTime: endTimeSlot });
      }
      openTimeSlot = endTimeSlot;
    }
    this.timeRange = timeRange;
  }

  addReservation(timeSlot) {
    this.openAddReservation(timeSlot);
  }

  async openAddReservation(timeSlot) {
    const modal = await this.modalController.create({
      component: AmenityReservationComponent,
      componentProps: { amenity: this.amenity, userId: this.userId, timeSlot: timeSlot }
    });

    modal.onDidDismiss().then(value => {
      const { data } = value;
      if (data) {
        this.getAmenityReservation();
      }
    })

    return await modal.present();
  }

  checkIsCurrentDate() {
    this.isCurrentDate = moment().isSame(this.serachStartTime, 'days');
    return;
  }



  onClickDateChange(type: string = 'next') {
    this.serachStartTime = type === 'previous' ? moment(moment(this.serachStartTime).subtract(1, 'days')).format('YYYY-MM-DD') : moment(moment(this.serachStartTime).add(1, 'days')).format('YYYY-MM-DD');
    this.searchEndTime = moment(moment(this.serachStartTime).add(1439, 'minutes')).format('YYYY-MM-DD HH:mm:ss');
    this.checkIsCurrentDate();
    this.replaceRoutedQueryParam(this.serachStartTime, this.searchEndTime);
  }

  replaceRoutedQueryParam(startTime, endTime) {
    const queryParams: Params = { startTime: startTime, endTime: endTime };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      replaceUrl: true,
    });
  }

}
