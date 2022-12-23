import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '@app/providers/user-data';
import { ModalController, PopoverController } from '@ionic/angular';
import { EventRegistrationComponent } from '../event-registration/event-registration.component';
import { EventObject } from '../event.model';
import { environment } from '@environments/environment';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {

  private event: EventObject;
  private userId: any;
  private locationId: string;
  private baseUrl = environment.baseUrl;

  constructor(
    private popoverCtl: PopoverController,
    private modalCtl: ModalController,
    private userData: UserData,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.getEventDetails();
  }

  getEventDetails() {
    const eventId = this.activatedRoute.snapshot.params?.eventId;
    this.eventService.getEventDetails(eventId).subscribe(res => {
      this.event = res;
    })
  }

  async openRegistrationPopOver() {
    const modal = await this.modalCtl.create({
      component: EventRegistrationComponent,
      componentProps: { event: this.event, userId: this.userId, locationId: this.locationId }

    });
    return await modal.present();

  }

  getUserInfo() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
    })
    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
    })
  }

}
