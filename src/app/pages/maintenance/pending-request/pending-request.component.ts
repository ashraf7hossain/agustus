import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsRequestModalComponent } from '../details-request-modal/details-request-modal.component';
import { MaintenanceObject } from '../maintenance.model';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss'],
})
export class PendingRequestComponent implements OnInit {
  @Input() pendingList: Array<MaintenanceObject>;

  constructor(private modalCtl: ModalController) { }

  ngOnInit() {
    console.log(this.pendingList);
  }
  
  async showDetails(data) {
    const modal = await this.modalCtl.create({
      component: DetailsRequestModalComponent,
      componentProps: { maintenanceObj: data }
    });

    return await modal.present();
  }

}
