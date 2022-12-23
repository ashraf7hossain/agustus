import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ResidentDetail } from '@app/pages/messaging/messaging.model';
import { MessageService } from '@app/pages/messaging/messaging.service';
import { UserData } from '@app/providers/user-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chatGroups: [];
  userId: string;
  locationId: string;
  messageResidents: Array<ResidentDetail>;
  private subscription: Subscription;
  candos1 = [
    {
      title: 'Lighting alksmwlkamdlasmdlmasldkmaslkdmalsk aslkaLKamlkSL,;A',
      icon: ['fas', 'lightbulb']
    },
    {
      title: 'Thermostat',
      icon: ['fas', 'temperature-high']
    },
    {
      title: 'Access',
      icon: ['fas', 'lock']
    },
    {
      title: 'Cameras',
      icon: ['fas', 'camera']
    },
    {
      title: 'Doorbell',
      icon: ['fas', 'bell']
    }
  ];
  constructor(private userData: UserData,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {

    this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/message-board/tabs/chat') {
        this.onEnter();
      }
    });

  }

  onEnter() {
    this.userData.getUserData().then(user => {
      const userId = user['userId'];
      this.userId = userId;
      this.getMessageGroup(userId);
    });

    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
      this.getResident();
    })
  }

  getResident() {
    this.messageService.getResidentMessageUsers(this.locationId).subscribe((res) => {
      this.messageResidents = [];
      for (var r in res) {
        this.messageResidents.push(new ResidentDetail(res[r]["residents"]));
      }

    })
  }

  getMessageGroup(userId: string) {
    this.messageService.getUserMessageGroups(userId).subscribe(messageGroups => {
      this.chatGroups = messageGroups;
    })
  }

  updateSchedule() {

  }
}
