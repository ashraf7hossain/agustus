import { Component, OnInit } from '@angular/core';
import { UserData } from '@app/providers/user-data';
import { MaintenanceObject } from './maintenance.model';
import { MaintenanceService } from './maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

  private selectedTab = 'pending-tab';
  private pendingList: Array<MaintenanceObject>;
  private completeList: Array<MaintenanceObject>;
  private userId: string;
  private locationId: string;
  constructor(private maintenanceService: MaintenanceService,
    private userData: UserData) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
    })
    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
      this.getMaintenanceList();
    })
  }

  segmentChanged(event) {
    this.selectedTab = event.target.value;
  }

  getMaintenanceList() {
    this.maintenanceService.getLocationMiantenanceDetails(this.locationId).subscribe(res => {
      this.pendingList = res.filter(obj => obj.status == 'In Progress');
      this.completeList = res.filter(obj => obj.status === 'Complete');

    })
  }

}
