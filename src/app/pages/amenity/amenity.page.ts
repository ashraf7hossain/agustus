import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { UserData } from '@app/providers/user-data';
import { environment } from '@environments/environment';
import { PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { AmenityObject } from './amenities.model';
import { AmenitiesService } from './amenities.service';
import { AmenityPopoverComponent } from './amenity-popover/amenity-popover.component';

@Component({
  selector: 'app-amenity',
  templateUrl: './amenity.page.html',
  styleUrls: ['./amenity.page.scss'],
})
export class AmenityPage implements OnInit {

  locationId: string;
  baseUrl = environment.baseUrl;

  amenities: Array<AmenityObject>;
  private queryParams: Params;

  constructor(private userData: UserData,
    private amenitiesService: AmenitiesService,
    private popoverCtrl: PopoverController) {

    const serachStartTime = moment().format('YYYY-MM-DD');
    const searchEndTime = moment(moment(serachStartTime).add(1439, 'minutes')).format('YYYY-MM-DD HH:mm:ss');
    this.queryParams = { startTime: serachStartTime, endTime: searchEndTime };
  }

  ngOnInit() {
    this.getLocaltionId();
  }

  getLocaltionId() {
    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
      this.getLocationAmenities(locationId);
    });
  }

  getLocationAmenities(locationId: string) {
    this.amenitiesService.getLocationAmenities(locationId).subscribe(res => {
      this.amenities = res;
    })
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: AmenityPopoverComponent,
      event
    });
    await popover.present();
  }


}
