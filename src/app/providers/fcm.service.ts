import { Injectable } from '@angular/core';
import {
  Device,
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor,

} from '@capacitor/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { UserData } from './user-data';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router: Router,
    private firebase: FirebaseService,
    private userData: UserData
  ) { }

  initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });


    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        // console.log('My token: ' + JSON.stringify(token));
        this._saveDeviceToken(token.value);
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      // console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        // console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        // console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.routePath) {
          this.router.navigateByUrl(data.routePath);
        }
      }
    );
  }

  /**
  * Save Device token in firebase
  */
  private async _saveDeviceToken(token: string) {

    const { userId } = await this.userData.getUserData();
    const deviceId = await Device.getUid();
    const deviceData = {};
    deviceData[deviceId] = token;

    this.firebase.updateDocument('devices', userId, deviceData)
      .then(() => {
        // console.log('Device token has updated successfully');
      }).catch((e) => {
        // console.log('Device token has not updated.Trying to insert');
        this.firebase.saveDocument('devices', userId, deviceData);
      });

  }

}
