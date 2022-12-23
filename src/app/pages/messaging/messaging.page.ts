import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationDetail, ManagementUser } from '@app/providers/account/account.model';
import { AccountService } from '@app/providers/account/account.service';
import { Auth } from '@app/providers/auth';
import { EmployeeDetail, MessagingGroup, OtherMessageUsers, ResidentDetail } from './messaging.model';
import { MessageService } from './messaging.service';


@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {


  messageEmployees: EmployeeDetail[];
  messageResidents: ResidentDetail[];

  employeeDetail: EmployeeDetail;
  locationDetail: LocationDetail;
  
  managementUser: ManagementUser;
  messageGroups: MessagingGroup[];
  


  constructor(private messageService: MessageService,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit() {
    this.managementUser = {
      email: "tahmina@augustusapp.com",
      id: "d5002303-95a0-4c1a-9e17-92607f366f2a",
      name: "Tahmina Khatoon",
      residentId: '6'
  
    }
    // this.accountService.getManagementUser().subscribe((user) => {
    //   this.managementUser = user;

      this.accountService.getEmployeeDetails(this.managementUser.id).subscribe((employee) => {
        this.employeeDetail = employee;

      if (this.employeeDetail.isAdmin) {
      this.accountService.getAdminLocationDetails(this.managementUser.id).subscribe((location) => {
        this.locationDetail = location;

        // this.messageService.getResidentMessageUsers(this.locationDetail.id).subscribe((res) => {
        //   this.messageResidents = [];

        //   for (var r in res) {
        //     this.messageResidents.push(new ResidentDetail(res[r]["residents"]));
        //   }

        // })

        // this.messageService.getEmployeeMessageUsers(this.locationDetail.id).subscribe((res) => {
        //   this.messageEmployees = [];

        //   for (var r in res) {
        //     this.messageEmployees.push(new EmployeeDetail(res[r]["employees"]));
        //   }

        // })
      })
      } else {
        return;
      }
      })

      this.getMessageGroups();

   // }, (err) => {
      // this.router.navigate(['/']);

    // });

    // const parsedUrl = new URL(window.location.href);
    // const baseUrl = parsedUrl.origin;
    // this.baseUrl = baseUrl;

    // this.scrollToBottom();
  }

  getMessageGroups() {
    this.messageService.getUserMessageGroups(this.managementUser.id).subscribe((res) => {
      this.messageGroups = [];

      for (var r in res) {
        this.messageGroups.push(new MessagingGroup(res[r]));
      }
    })
  }

}
