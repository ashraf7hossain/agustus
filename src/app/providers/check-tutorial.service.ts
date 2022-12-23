import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: "root"
})
export class CheckTutorial implements CanLoad {
  constructor(private storage: Storage, private router: Router) {}

  canLoad() {
    return this.storage.get("augustus_did_tutorial").then(res => {
      if (res) {
        this.router.navigateByUrl("/dashboard", { replaceUrl: true });
        return false;
      } else {
        return true;
      }
    });
  }
}