import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-amenity-popover',
  templateUrl: './amenity-popover.component.html',
  styleUrls: ['./amenity-popover.component.scss'],
})
export class AmenityPopoverComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController,
    private router: Router) { }

  ngOnInit() { }

  close(url: string) {
    this.router.navigateByUrl(url);
    this.popoverCtrl.dismiss();
  }

}
