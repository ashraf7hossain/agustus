import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ask-for-anything-modal',
  templateUrl: './ask-for-anything-modal.component.html',
  styleUrls: ['./ask-for-anything-modal.component.scss'],
})
export class AskForAnythingModalComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public closeModal() {
    this.modalController.dismiss();
  }

}
