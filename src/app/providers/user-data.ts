import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = "hasLoggedIn";
  HAS_SEEN_TUTORIAL = "hasSeenTutorial";

  constructor(public storage: Storage) {}

  hasFavorite(sessionName: string): boolean {
    return this.favorites.indexOf(sessionName) > -1;
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(username: string, userData): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      this.setUserData(userData);
      return window.dispatchEvent(new CustomEvent("user:login"));
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent("user:signup"));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      this.storage.remove('username');
      this.storage.remove('userResidentLocationId');
      this.storage.remove('profileImageId');
      return this.storage.remove('profile');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUserData(userData: any): Promise<any> {
    return this.storage.set("profile", userData);
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set("username", username);
  }

  setUserProfileImageId(profileImageId: string): Promise<any> {
    return this.storage.set('profileImageId', profileImageId);
  }

  setUserResidentLocationId(locationData: any): Promise<any> {
    return this.storage.set("userResidentLocationId", locationData);
  }

  setUserSubscription(Data: any): Promise<any> {
    return this.storage.set("userSubscription", Data);
  }

  getUserSubscription(): Promise<any> {
    return this.storage.get("userSubscription").then(val => {
      return val;
    });
  }

  getUsername(): Promise<string> {
    return this.storage.get("username").then(value => {
      return value;
    });
  }

  getProfileImageId(): Promise<string> {
    return this.storage.get('profileImageId').then((value) => {
      return value;
    });
  }

  getUserData(): Promise<any> {
    return this.storage.get("profile").then(value => {
      return value;
    });
  }

  getUserResidentLocationId(): Promise<string> {
    return this.storage.get("userResidentLocationId").then(value => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then(value => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then(value => {
      return value;
    });
  }
}
