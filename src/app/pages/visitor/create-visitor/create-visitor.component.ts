import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '@app/providers/user-data';
import * as moment from 'moment';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-create-visitor',
  templateUrl: './create-visitor.component.html',
  styleUrls: ['./create-visitor.component.scss'],
})
export class CreateVisitorComponent implements OnInit {

  userId: string;
  locationId: string;
  dropDownList = [{ name: 'Yes', value: true }, { name: 'No', value: false }];
  visitorForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private userData: UserData,
    private visitorService: VisitorService,
    private router: Router
  ) {
    this.visitorForm = this.formBuilder.group({
      notes: [null],
      visitorName: [null, Validators.required],
      arrivalTime: [null, Validators.required],
      departureTime: [null, Validators.required],
      isAccessKey: [null, Validators.required],
      isParkingPassKey: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const { userId } = await this.userData.getUserData();
    this.userId = userId;
    this.locationId = await this.userData.getUserResidentLocationId();
  }

  submitVisitor() {
    if (!this.visitorForm.valid) {
      return;
    }
    const formData = this.visitorForm.value;
    formData.arrivalTime = moment(formData.arrivalTime).format('YYYY-MM-DD HH:mm');
    formData.departureTime = moment(formData.departureTime).format('YYYY-MM-DD HH:mm');

    const visitor = Object.assign({
      userId: this.userId,
      locationId: this.locationId
    }, formData);

    this.visitorService.addVisitor(visitor).subscribe(res => {
      this.router.navigateByUrl('/visitor', { replaceUrl: true });
    })

  }

}
