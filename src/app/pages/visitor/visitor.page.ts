import { Component, OnInit } from '@angular/core';
import { UserData } from '@app/providers/user-data';
import { VisitorService } from './visitor.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.page.html',
  styleUrls: ['./visitor.page.scss'],
})
export class VisitorPage implements OnInit {

  userId: string;
  locationId: string;
  visitorList: Array<any>;
  private isSelectApproved: boolean;
  private selectedTabArrayList: Array<any>;
  constructor(private userData: UserData, private visitorService: VisitorService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const { userId } = await this.userData.getUserData();
    this.userId = userId;
    this.locationId = await this.userData.getUserResidentLocationId();
    this.getVisitorList();
  }

  getVisitorList() {

    this.visitorService.getVisitor(this.userId, this.locationId).subscribe(res => {
      this.visitorList = res;
      this.isSelectApproved = false;
      this.selectedTabArrayList = res.filter(obj => !obj.isApproved);

    });
  }

  segmentChanged(event) {
    this.isSelectApproved = JSON.parse(event.target.value);
    this.selectedTabArrayList = this.visitorList.filter(obj => obj.isApproved === this.isSelectApproved);
  }

}
