import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AskForAnythingModalComponent } from './ask-for-anything-modal/ask-for-anything-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  offsetTop = '0px';
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    
  }

  async openModal() {
    const askModal = await this.modalController.create({
      component: AskForAnythingModalComponent,
      backdropDismiss: true,
    });

    await askModal.present();
  }

  onScroll(event) {
    let scrollTop = event.detail.scrollTop;
    if (scrollTop < 200) {
      this.offsetTop = scrollTop + 'px';
    }
  }
}
