import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MaintenanceObject } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';
import { StarRatingColor } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss'],
})
export class AddFeedbackComponent implements OnInit {

  @Input() maintenanceObj: MaintenanceObject;
  @Input() userId: string;
  @Input() locationId: string;
  rating: number = 5;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  ratingDetails = new FormControl('');
  constructor(private modalCtl: ModalController, private maintenanceService: MaintenanceService) { }

  ngOnInit() {
  }

  onRatingChanged(rating) {
    this.rating = rating;
  }

  dismiss() {
    this.modalCtl.dismiss();
  }

  submitFeedBack() {
    if (!this.rating) {
      return;
    }
    const maintenance = {
      id: this.maintenanceObj.id,
      rating: this.rating,
      ratingDetails: this.ratingDetails.value
    };
    this.maintenanceService.addRatingToMaintenance(maintenance).subscribe(res => {
      this.modalCtl.dismiss(true);
    });
  }

}
