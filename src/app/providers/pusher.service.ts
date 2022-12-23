
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';
import Pusher from 'pusher-js';

@Injectable()
export class PusherService {
  public pusher: any;
  public groupMessageChannel: any;
  constructor(public http: HttpClient) {
    this.pusher = new Pusher(ENV.pusher.key, {
      cluster: ENV.pusher.cluster
    });

    this.groupMessageChannel = this.pusher.subscribe('group-message');
  }

  public init() {
    return this.groupMessageChannel;
  }
}
