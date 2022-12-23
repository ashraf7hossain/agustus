
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Messages, MessagingGroup } from '../messaging.model';
import { MessageService } from '../messaging.service';


@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss'],
})
export class AddMessageComponent implements OnInit {
 
  @ViewChild('scrollable', { static: false }) private scrollContainer: ElementRef;

  selectedGroup: MessagingGroup;
  isNewMessage: boolean;
  managementUser: any;    // ManagementUser;
  messages: Messages[];
  messageBody: string;
  locationDetail: any;

  constructor(private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    const routeData = this.router.getCurrentNavigation().extras.state;
    this.selectedGroup = routeData?.messagingGroup;
    this.managementUser = routeData?.managementUser;
    this.locationDetail = routeData?.locationDetail;
    console.log(routeData);
    this.selectMessageGroup();

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  selectMessageGroup() {

    if (this.selectedGroup) {
      this.selectedGroup.selected = false;
      this.isNewMessage = false;
      // this.selectedGroup = group;
      this.selectedGroup["selected"] = true;
  
      this.getGroupMessages();
    }

  }

  getGroupMessages() {
    this.messageService.getGroupMessages(this.selectedGroup["id"]).subscribe((res) => {
      this.messages = [];

      for (var r in res) {
        this.messages.push(new Messages(res[r]));
      }

      this.scrollToBottom();
    })
  }

  sendMessage() {
    if (this.messageBody == null) {
      return;
    }

    let message = {
      messageGroupId: this.selectedGroup["id"],
      creatorId: this.managementUser.id,
      messageBody: this.messageBody
    }

    this.messageService.sendGroupMessage(message).subscribe((res) => {
      this.messageBody = null;

      this.getGroupMessages();
    })
  }
}
