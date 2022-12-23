import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '@app/providers/user-data';
import { ModalController } from '@ionic/angular';
import { AddFeedbackComponent } from '../add-feedback/add-feedback.component';
import { DetailsRequestModalComponent } from '../details-request-modal/details-request-modal.component';
import { MaintenanceObject } from '../maintenance.model';


@Component({
  selector: 'app-complete-request',
  templateUrl: './complete-request.component.html',
  styleUrls: ['./complete-request.component.scss'],
})
export class CompleteRequestComponent implements OnInit {

  @Input() completeList: Array<MaintenanceObject>;
  userId: string;
  locationId: string;

  constructor(private modalCtl: ModalController, private userData: UserData, private router: Router) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
    })
    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
    })
  }

  async showDetails(data) {
    const modal = await this.modalCtl.create({
      component: DetailsRequestModalComponent,
      componentProps: { maintenanceObj: data, userId: this.userId, locationId: this.locationId }
    });
    return await modal.present();
  }

  async openFeedbackModal(data) {
    const modal = await this.modalCtl.create({
      component: AddFeedbackComponent,
      componentProps: { maintenanceObj: data }
    });
    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.router.navigateByUrl('/', { replaceUrl: true }).then(() => {
          this.router.navigate(['/maintenance'])

        })
      }
    })
    return await modal.present();
  }

}
