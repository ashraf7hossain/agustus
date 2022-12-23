import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { environment as ENV } from '@environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  baseUrl: string = ENV.baseUrl;

    constructor(
      private http: HttpClient, 
      private auth: Auth
    ) {

    }

  getPost(locationId): Observable<any> {
    // var apiUrl = this.baseUrl + `/api/TableServices/GetTodaysFloorplan`;
    const apiUrl = this.baseUrl + '/api/Forum/GetLocationForumPosts/' + locationId;
    // options
    const options = {
        headers: new HttpHeaders({
            'Authorization': this.auth.authorizationHeader()
        })
    };

    return this.http.get(apiUrl).pipe(
        map(res => res)
    );
  }

  addForumPost(forum: Object): Observable<any> {
   
    const apiUrl = this.baseUrl + '/api/Forum/AddForumPost';
    // options
    const options = {
        headers: new HttpHeaders({
            'Authorization': this.auth.authorizationHeader()
        })
    };

    return this.http.post(apiUrl, forum, {responseType: 'text'}).pipe(
        map(res => res)
    );
  }
  
  addForumPostComment(comment: Object): Observable<any> {
   
    const apiUrl = this.baseUrl + '/api/Forum/AddForumPostComment';
    // options
    const options = {
        headers: new HttpHeaders({
            'Authorization': this.auth.authorizationHeader()
        })
    };

    return this.http.post(apiUrl, comment, {responseType: 'text'}).pipe(
        map(res => res)
    );
  }

  getForumComments(postId): Observable<any> {
    // var apiUrl = this.baseUrl + `/api/TableServices/GetTodaysFloorplan`;
    const apiUrl = this.baseUrl + '/api/Forum/GetForumComments/' + postId;
    // options
    const options = {
        headers: new HttpHeaders({
            'Authorization': this.auth.authorizationHeader()
        })
    };

    return this.http.get(apiUrl).pipe(
        map(res => res)
    );
  }

  addForumPostLike(postLike: any): Observable<any> {
   
    const apiUrl = this.baseUrl + '/api/Forum/AddForumPostLike/' + postLike.parentMessageId;
    // options
    const options = {
        headers: new HttpHeaders({
            'Authorization': this.auth.authorizationHeader()
        })
    };
    return this.http.post(apiUrl, postLike, {responseType: 'text'}).pipe(
        map(res => res)
    );
  }

  removeForumPostLike(postId, userId): Observable<any> {
   
    const apiUrl = `${this.baseUrl}/api/Forum/RemoveForumPostLike/${postId}/${userId}`;
    // options
    const options = {
        headers: new HttpHeaders({
            'Authorization': this.auth.authorizationHeader()
        })
    };

    return this.http.post(apiUrl, null, {responseType: 'text'}).pipe(
        map(res => res)
    );
  }

  addForumCommentLike(commentLike: any): Observable<any> {
   
    const apiUrl = this.baseUrl + '/api/Forum/AddForumCommentLike/' + commentLike.parentCommentId;
    // options
    const options = {
        headers: new HttpHeaders({
            'Authorization': this.auth.authorizationHeader()
        })
    };

    return this.http.post(apiUrl, commentLike, {responseType: 'text'}).pipe(
        map(res => res)
    );
  }

  removeForumCommentLike(commentId, userId): Observable<any> {
   
    const apiUrl = `${this.baseUrl}/api/Forum/RemoveForumCommentLike/${commentId}/${userId}`;
    // options
    const options = {
        headers: new HttpHeaders({
            'Authorization': this.auth.authorizationHeader()
        })
    };

    return this.http.post(apiUrl, null, {responseType: 'text'}).pipe(
        map(res => res)
    );
  }

}
