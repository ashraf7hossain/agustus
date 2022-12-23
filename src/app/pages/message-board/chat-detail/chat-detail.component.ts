import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Messages, MessagingGroup } from '@app/pages/messaging/messaging.model';
import { MessageService } from '@app/pages/messaging/messaging.service';
import { PusherService } from '@app/providers/pusher.service';
import { UserData } from '@app/providers/user-data';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
})
export class ChatDetailComponent implements OnInit {

  @ViewChild('scrollable', { static: false }) private scrollContainer: ElementRef;

  selectedGroup: MessagingGroup;
  isNewMessage: boolean;
  userId: string;    // ManagementUser;
  messages: Messages[];
  messageBody: string;
  locationDetail: any;

  constructor(private router: Router,
    private userData: UserData,
    private messageService: MessageService,
    private pusher: PusherService) { }

  ngOnInit() {
    const routeData = this.router.getCurrentNavigation().extras.state;
    this.selectedGroup = routeData?.messagingGroup;
    // this.selectMessageGroup();
    this.getUserData();
    const channel = this.pusher.init();
    const groupMessageId: string = this.selectedGroup.id;
    channel.bind(groupMessageId, (data) => {
      if (data && data.CreatorId != this.userId) {
        this.messages.push(data);
      }
    });

  }

  getUserData() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
      this.getGroupMessages();
      this.scrollToBottom();
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  // selectMessageGroup() {

  //   if (this.selectedGroup) {
  //     this.selectedGroup.selected = false;
  //     this.isNewMessage = false;
  //     // this.selectedGroup = group;
  //     this.selectedGroup["selected"] = true;

  //     this.getGroupMessages();
  //   }

  // }

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
      creatorId: this.userId,
      messageBody: this.messageBody,
    }

    this.messageService.sendGroupMessage(message).subscribe((res) => {
      this.messageBody = null;

      this.getGroupMessages();
    })
  }

}
