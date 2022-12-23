import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageService } from '../messaging.service';
import { MessageUsers, EmployeeDetail, ResidentDetail } from '../messaging.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-message-user',
  templateUrl: './new-message-user.html',
  styleUrls: ['./new-message-user.css']
})
export class NewMessageUserComponent implements OnInit {

  locationId: string;
  messageGroupId: string;
  managementUserId: string;

  messageEmployees: EmployeeDetail[];
  messageResidents: ResidentDetail[];

  newMessageUser: Object;

  constructor(private snackBar: MatSnackBar,
    private messageService: MessageService,
    private router: Router,
   private navCtl: NavController
    
  ) {
    const routeState = this.router.getCurrentNavigation().extras?.state;
    this.locationId = routeState?  routeState.locationId : null;
    this.messageGroupId = routeState?  routeState.messageGroupId : null;
    this.managementUserId = routeState?  routeState.managementUserId : null;
  }

  ngOnInit() {
    this.messageService.getResidentMessageUsers(this.locationId).subscribe((res) => {
      this.messageResidents = [];

      for (var r in res) {
        this.messageResidents.push(new ResidentDetail(res[r]["residents"]));
      }

    })

    this.messageService.getEmployeeMessageUsers(this.locationId).subscribe((res) => {
      this.messageEmployees = [];

      for (var r in res) {
        this.messageEmployees.push(new EmployeeDetail(res[r]["employees"]));
      }

    })
  }

  addUser() {

    if (this.newMessageUser.constructor.name == "EmployeeDetail") {
      //Add Employee
      let messageUser = {
        userId: this.newMessageUser["employeeUserId"],
        groupId: this.messageGroupId,
        isActive: true
      }

      this.messageService.addMessageGroupUser(messageUser).subscribe((res) => {
        console.log(res);
        this.close();
      }, (err) => {
        if (err.status == 403) {
          this.userAlreadyExists();
        }
      })

    } else if (this.newMessageUser.constructor.name == "ResidentDetail") {
      //Add Resident
      let messageUser = {
        userId: this.newMessageUser["residentUserId"],
        groupId: this.messageGroupId,
        isActive: true
      }

      this.messageService.addMessageGroupUser(messageUser).subscribe((res) => {
        console.log(res);
        this.close();
      }, (err) => {
          if (err.status == 403) {
            this.userAlreadyExists();
          }
      })

    }
  }

  createMessageGroup() {

    let messageGroup = {
      name: null,
      isActive: true
    }

    if (this.newMessageUser.constructor.name == "EmployeeDetail") {
      //Add Employee
      this.messageService.addMessageGroup(messageGroup, this.managementUserId, this.newMessageUser["employeeUserId"]).subscribe((res) => {
        console.log(res);
        // this.getMessageGroups();
        // this.isNewMessage = false;
        // this.selectMessageGroup(res);
      })

    } else if (this.newMessageUser.constructor.name == "ResidentDetail") {
      //Add Resident
      this.messageService.addMessageGroup(messageGroup, this.managementUserId, this.newMessageUser["residentUserId"]).subscribe((res) => {
        console.log(res);
        // this.getMessageGroups();
        // this.isNewMessage = false;
        // this.selectMessageGroup(res);
      })

    }
  }

  userAlreadyExists() {
    this.snackBar.open('The user you are trying to add is already in this message thread', 'Ok', {
      duration: 5000,
    });
  }

  close() {
    this.navCtl.back();
  }

}
