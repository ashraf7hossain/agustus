import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '@app/providers/forum.service';
import { UserData } from '@app/providers/user-data';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  forumForm: FormGroup;
  locationId: string;
  userId: string;
  constructor(private formBuilder: FormBuilder,
    private forumService: ForumService, private navCtl: NavController,
   private userData: UserData) {
    
    this.forumForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      message: [null, Validators.required]
  });
}

  ngOnInit() {
    this.userData.getUserData().then(user => {
      this.userId = user['userId'];
    })
    this.userData.getUserResidentLocationId().then(locationId => {
      this.locationId = locationId;
    })
  }

  saveForum() {

    if (!this.forumForm.valid) {
      return;
    }

    let forum = Object.assign({
      locationId:  this.locationId,
      userId: this.userId,
      totalLikes: 0,
    }, this.forumForm.value);

    this.forumService.addForumPost(forum).subscribe(() => {
      this.forumForm.reset();
      this.navCtl.navigateBack('/forum');
    })
  }

}
