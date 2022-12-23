import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  userId: string;
  locationId: string;
  contactList: Array<any>;
  private isEmergency: boolean;
  private selectedTabArrayList: Array<any>;
  constructor( private contactService: ContactService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getContactList();
  }

  
  getContactList() {
    this.contactService.getContact().subscribe(res => {
      this.contactList = res;
      this.isEmergency = false;
      this.selectedTabArrayList = res.filter(obj => !obj.isEmergencyContact);
    });
  }

  segmentChanged(event) {
    this.isEmergency = JSON.parse(event.target.value);
    this.selectedTabArrayList = this.contactList.filter(obj => obj.isEmergencyContact === this.isEmergency);
  }
}
