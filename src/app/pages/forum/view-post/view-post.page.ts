import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ForumService } from '@app/providers/forum.service';
import * as moment from 'moment';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {

  message = new FormControl('');
  commentReply = new FormControl('');
  slectedCommentId = null;
  forumPost: any;
  constructor(private router: Router,
  private forumService: ForumService) { }

  ngOnInit() {
    this.forumPost = this.router.getCurrentNavigation().extras.state.post;
  }

  submitComment() {
  this.message.value;
    if (!this.message.value) {
      return;
    }
    let comment = {
      parentMessageId: this.forumPost.id,
      userId: this.forumPost.userId,
      message: this.message.value,
      totalLikes: this.forumPost.totalLikes,
      totalReplies: 0,
      createDate: this.forumPost.createDate,
      lastChanged: this.forumPost.lastChanged,
    };

    this.forumService.addForumPostComment(comment).subscribe(res => {
      this.message.reset();
      this.refereshComment();
    })
  }

  getHumanize(data: string) {
    return moment(data).fromNow();
  }

  refereshComment() {
    this.forumService.getForumComments(this.forumPost.id).subscribe(res => {
      this.forumPost.comments = res;
    })
  }

  onClickReply(commentId) {
    this.slectedCommentId = commentId;
    this.commentReply.reset();
  }

  addForumPostLike() {
    const postLike = {
      "parentMessageId": this.forumPost.id,
      "userId": this.forumPost.userId,
    }
    this.forumService.addForumPostLike(postLike).subscribe(res => {
      this.forumPost.totalLikes = 1;
    });
  }

  removeForumLike() {

    this.forumService.removeForumPostLike(this.forumPost.id, this.forumPost.userId).subscribe(res => {
      this.forumPost.totalLikes = 0;
    });
  }

  addForumCommentLike(commentId) {
    const commentLike = {
      "parentCommentId": commentId,
      "userId": this.forumPost.userId,
    }
    this.forumService.addForumCommentLike(commentLike).subscribe(res => {
      this.refereshComment();
    });
  }

  removeForumCommentLike(commentId) {

    this.forumService.removeForumCommentLike(commentId, this.forumPost.userId).subscribe(res => {
      this.refereshComment();
    });
  }

  submitReply() {
    
  }

  

}
