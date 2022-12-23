import { Component, OnInit } from '@angular/core';
import { UserData } from '@app/providers/user-data';
import { PopoverController } from '@ionic/angular';
import { EventObject } from './event.model';
import { EventService } from './event.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  private userId: string;
  private locationId: string;
  private eventList: Array<EventObject>
  private baseUrl = environment.baseUrl;
  
  constructor(private popOverCtl: PopoverController,
    private userData: UserData,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
    })
    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
      this.getEventList(locationId);
    })
  }

  getEventList(locationId){
    this.eventService.getLocationEvent(locationId).subscribe(res => {
      this.eventList = res;
    })
  }



}
