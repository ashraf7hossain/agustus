import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserData } from '@app/providers/user-data';
import { NavController } from '@ionic/angular';
import { MaintenanceService } from '../maintenance.service';


@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
})
export class AddRequestComponent implements OnInit {

  issueList = [
    { name: 'Appliance', value: 'Appliance' },
    { name: 'Basement', value: 'Basement' },
    { name: 'Door/Lock', value: 'Door/Lock' },
    { name: 'Elevator', value: 'Elevator' },
    {name: 'General/Safety', value: 'General/Safety'}
  ]
  requestForm: FormGroup;
  userId: string;
  locationId: string;
 

  constructor(private formBuilder: FormBuilder,
    private maintenanceService: MaintenanceService,
    private navCtrl: NavController,
    private userData: UserData
  ) {
    this.requestForm = this.formBuilder.group({
      name: ['',  Validators.required],
      description: [null],
      issueDate: [null, Validators.required],
      permission: [null, Validators.required],
      priority: [null, Validators.required],
      unit: [null, Validators.required]
  });
  }

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

  imageUpload() {
    
  }

  addMaintenance() {
    if (!this.requestForm.valid) {
      return;
    }
    const maintenance = Object.assign({
      userId: this.userId,
      locationId: this.locationId,
    }, this.requestForm.value);
    this.maintenanceService.addMaintenanceDetails(maintenance, null).subscribe(res => {
      this.navCtrl.back();
    });
  }



}
