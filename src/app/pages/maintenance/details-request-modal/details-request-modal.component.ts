import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserData } from '@app/providers/user-data';
import { environment } from '@environments/environment';
import { ModalController } from '@ionic/angular';
import { MaintenanceComment, MaintenanceObject } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-details-request-modal',
  templateUrl: './details-request-modal.component.html',
  styleUrls: ['./details-request-modal.component.scss'],
})
export class DetailsRequestModalComponent implements OnInit {

  @Input() maintenanceObj: MaintenanceObject;
  userId: string;
  maintenanceComments: MaintenanceComment[];
  comment = new FormControl('');
  private baseUrl = environment.baseUrl;
  constructor(private modalCtl: ModalController,
    private maintenanceService: MaintenanceService,
    private userData: UserData
  ) { }


  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
      this.getMaintenanceComments();
      // this.scrollToBottom();
    })
  }

  getMaintenanceComments() {
    this.maintenanceService.getMaintenanceComments(this.maintenanceObj["id"]).subscribe((res) => {
      this.maintenanceComments = [];

      for (var r in res) {
        this.maintenanceComments.push(new MaintenanceComment(res[r]));
      }
      // this.scrollToBottom();
    })
  }
  dismiss() {
    this.modalCtl.dismiss();
  }

  sendComment() {
    if (!this.comment.valid) {
      return;
    }
    const message = {
      maintenanceId: this.maintenanceObj["id"],
      creatorId: this.userId,
      messageBody: this.comment.value
    }

    this.maintenanceService.sendMaintenanceComment(message).subscribe((res) => {
      this.comment.reset();
      this.getMaintenanceComments();
    });
  }


}
