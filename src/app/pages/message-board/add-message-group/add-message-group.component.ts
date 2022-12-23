import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '@app/pages/messaging/messaging.service';
import { UserData } from '@app/providers/user-data';
import { IonSlides } from '@ionic/angular';
import { Observable, of, Subscription } from 'rxjs';


@Component({
  selector: 'app-add-message-group',
  templateUrl: './add-message-group.component.html',
  styleUrls: ['./add-message-group.component.scss'],
})
export class AddMessageGroupComponent implements OnInit {

  @ViewChild(IonSlides) ionSlides: IonSlides;

  searchResults$: Observable<any>;
  residentSearchResult$: Observable<any>;
  locationId: string;
  userId: string;
  isClickCreateGroup: boolean;
  addedGroups = [];
  subscription: Subscription;


  searchKey = new FormControl('', Validators.required);
  selectedSearchData = new FormControl('', Validators.required);
  groupForm = this.formBuilder.group({
    name: [null, [Validators.required]]
  });

  constructor(private messageService: MessageService,
    private userData: UserData,
    private router: Router,
    private formBuilder: FormBuilder) {

  }


  ngOnInit() {

    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
      this.searchResults$ = this.messageService.getEmployeeMessageUsers(this.locationId);
      this.residentSearchResult$ = this.messageService.getResidentMessageUsers(this.locationId);
    });
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
    })

    //   this.searchKey.valueChanges.pipe(
    //   distinctUntilChanged(),
    //   switchMap(search => {
    //     return this.messageService.getEmployeeMessageUsers(this.locationId);
    //   }),
    //   map(res => {
    //     console.log(res);
    //     return res;
    //   })
    // )
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

  createMessageGroup() {

    if (!this.groupForm.valid) {
      return;
    }

    let group = Object.assign({
      "isActive": true
    }, this.groupForm.value);
    const addedUserId = this.addedGroups[0].employees ? this.addedGroups[0].employees.employeeUserId : this.addedGroups[0].residents ? this.addedGroups[0].residents.residentUserId : null;
    if (addedUserId) {
      this.messageService.addMessageGroup(group, this.userId, addedUserId).subscribe(res => {
        this.groupForm.reset();
        this.addedGroups = [];
        this.router.navigate(['/message-board/tabs/chat']);
      });
    }
  }



  removeSelectedGroup() {

    this.ionSlides.getActiveIndex().then(
      index => {
        if (index === 0) {
          this.addedGroups.shift();
          this.ionSlides.update();
        }
        else {
          this.addedGroups.splice(index, 1);
          this.ionSlides.update();

        }
      }
    );
  }
}
