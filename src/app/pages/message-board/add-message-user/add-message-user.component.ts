import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '@app/pages/messaging/messaging.service';
import { UserData } from '@app/providers/user-data';
import { IonSlides, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-message-user',
  templateUrl: './add-message-user.component.html',
  styleUrls: ['./add-message-user.component.scss'],
})
export class AddMessageUserComponent implements OnInit {

  @ViewChild(IonSlides) ionSlidesOfUser: IonSlides;

  searchResults$: Observable<any>;
  residentSearchResult$: Observable<any>;
  locationId: string;
  userId: string;
  isClickCreateGroup: boolean;
  addedGroups = [];
  subscription: Subscription;
  messageGroupId: string;
  selectedSearchData = new FormControl('', Validators.required);
  searchKey = new FormControl('', Validators.required);
  groupForm = this.formBuilder.group({
  });
  constructor(private messageService: MessageService,
    private userData: UserData,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.messageGroupId = this.activatedRoute.snapshot.params?.messageGroupId;
    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
      this.searchResults$ = this.messageService.getEmployeeMessageUsers(this.locationId);
      this.residentSearchResult$ = this.messageService.getResidentMessageUsers(this.locationId);
    });
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
    })


    this.subscription = this.selectedSearchData.valueChanges.subscribe(
      groupData => {
        if (groupData) {
          this.addedGroups.splice(0, 1, groupData);
          this.selectedSearchData.reset();
        }
      });
  }

  onCreateGroup() {
    this.isClickCreateGroup = true;
  }

  addMessageUser() {
    if (!this.addedGroups.length) {
      return;
    }
    const addedUserId = this.addedGroups[0].employees ? this.addedGroups[0].employees.employeeUserId : this.addedGroups[0].residents ? this.addedGroups[0].residents.residentUserId : null;
    if (addedUserId && this.messageGroupId) {
      let messageUser = {
        userId: addedUserId,
        groupId: this.messageGroupId,
        isActive: true
      }
      this.messageService.addMessageGroupUser(messageUser).subscribe(res => {
        this.selectedSearchData.reset();
        this.addedGroups = [];
        this.router.navigate(['/message-board/tabs/chat']);
      }, err => {
        if (err.status == 403) {
          this.userAlreadyExistsToast();
        }
      });
    }
  }

  removeSelectedGroup() {

    this.ionSlidesOfUser.getActiveIndex().then(
      index => {
        if (index === 0) {
          this.addedGroups.shift();
          this.ionSlidesOfUser.update();
        }
        else {
          this.addedGroups.splice(index, 1);
          this.ionSlidesOfUser.update();
        }
      }
    );
  }

  async userAlreadyExistsToast() {

    const toast = await this.toastController.create({
      message: 'The user you are trying to add is already in this message thread',
      duration: 5000
    });
    toast.present();
  }

}
