import { Component, OnInit } from '@angular/core';
import { UserData } from '@app/providers/user-data';
import * as moment from 'moment';
import { AmenitiesService } from '../amenities.service';

@Component({
  selector: 'app-amenity-reservation-list',
  templateUrl: './amenity-reservation-list.component.html',
  styleUrls: ['./amenity-reservation-list.component.scss'],
})
export class AmenityReservationListComponent implements OnInit {

  userId: string;
  locationId: string;
  reservedAmenities: [];
  reservedAmenitiesGroupingObj: any;
  reservedAmenitiesObjKeys: Array<any>;


  constructor(private userData: UserData,
    private amenitiesService: AmenitiesService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
    })
    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
      const serachStartTime = moment().format('YYYY-MM-DD')
      this.getReservedAmenities(this.userId, locationId, serachStartTime);
    });
  }

  getReservedAmenities(userId: string, locationId: string, serachStartTime: string) {
    this.amenitiesService.getReservedAmenities(userId, locationId, serachStartTime).subscribe(res => {
      if (res && res.length) {

        this.reservedAmenities = res;
        let result = this.groupBy('startTime', this.reservedAmenities);
        this.reservedAmenitiesGroupingObj = result;
        this.reservedAmenitiesObjKeys = Object.keys(result);
      }
    })
  }

  groupBy = (key, array) =>
    array.reduce(
      (objectsByKeyValue, obj) => {
        const value = moment(obj[key]).format('YYYY-MM-DD');
        return {
          ...objectsByKeyValue,
          [value]: (objectsByKeyValue[value] || []).concat(obj)
        }
      },
      {}
    );


}
