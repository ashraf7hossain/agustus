import { Component, OnInit } from '@angular/core';
import { ForumService } from '@app/providers/forum.service';
import { UserData } from '@app/providers/user-data';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AddPostPage } from './add-post/add-post.page';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  shownPost = 0;
  postList = [];
  locationId: string

  constructor(private forumService: ForumService, private userData: UserData) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getUserResidentLocationId();
  }

  getUserResidentLocationId() {
    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
      this.getForumList();
    })
  }

  getForumList() {
    this.forumService.getPost(this.locationId).subscribe(res => {
      this.postList = res;
      this.shownPost = this.postList.length;
    });
  }

  getHumanize(data: string) {
    return moment(data).fromNow();
  }

}
