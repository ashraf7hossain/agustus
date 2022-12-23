import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { EventObject } from '../event.model';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.scss'],
})
export class EventRegistrationComponent implements OnInit {

  @Input() event: EventObject;
  @Input() userId;
  @Input() locationId;
  eventRegistrationForm: FormGroup;

  constructor(private popoverCtl: PopoverController,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private modalCtl: ModalController
  ) {
    this.eventRegistrationForm = this.formBuilder.group({
      totalGuests: [null, [
        Validators.required,
        Validators.min(1)]],
      ticketClass: [null, Validators.required],
      cost: [null, Validators.required],
      referralCode: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      emailAddress: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  addEventAttendee() {
    if (!this.eventRegistrationForm.valid) {
      return;
    }

    const eventAttendee = Object.assign({

      "eventId": this.event.id,
      "residentUserId": this.userId,
      "locationId": this.locationId,
    }, this.eventRegistrationForm.value);

    this.eventService.addEventAttendee(eventAttendee).subscribe(res => {
      this.closePopover();
    })
  }

  closePopover() {
    this.modalCtl.dismiss();
  }

}
