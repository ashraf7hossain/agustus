import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { ModalController, PopoverController } from "@ionic/angular";
import * as moment from "moment";
import { AmenityObject } from "../amenities.model";
import { AmenitiesService } from "../amenities.service";

@Component({
  selector: "app-amenity-reservation",
  templateUrl: "./amenity-reservation.component.html",
  styleUrls: ["./amenity-reservation.component.scss"]
})
export class AmenityReservationComponent implements OnInit {
  @Input() amenity: AmenityObject;
  @Input() userId: string;
  @Input() timeSlot: any;

  loadPayment: false;
  reservationForm: FormGroup;
  maxGuests: number;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private amenitiesService: AmenitiesService
  ) {}

  ngOnInit() {
    this.maxGuests = this.amenity.maxGuests;
    this.reservationForm = this.formBuilder.group({
      totalGuests: [
        null,
        [
          Validators.required,
          (control: AbstractControl) => Validators.max(this.maxGuests)(control)
        ]
      ],
      // totalGuests: [null, [Validators.required]],
      notes: [null],
      totalCost: [0]
    });

    this.reservationForm.get("totalGuests").valueChanges.subscribe(guest => {
      let total = 0;
      if (guest && !isNaN(guest)) {
        total = this.amenity.price * Number(guest);
      } else {
        total = this.amenity.price * 1;
      }
      this.reservationForm.get("totalCost").setValue(total);
    });
  }

  onSuccessPayment(totalCost: number) {
    if (!this.reservationForm.valid) {
      return;
    }

    const reservation = Object.assign(
      {
        amenityId: this.amenity.id,
        locationId: this.amenity.locationId,
        userId: this.userId,
        isApproved: false,
        totalCost: totalCost,
        startTime: moment(this.timeSlot.startTime).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        endTime: moment(this.timeSlot.endTime).format("YYYY-MM-DD HH:mm:ss")
      },
      this.reservationForm.value
    );

    this.amenitiesService.addAmenityReservation(reservation).subscribe(res => {
      this.modalController.dismiss(res);
    });
  }

  closePopover() {
    this.modalController.dismiss();
  }
}
