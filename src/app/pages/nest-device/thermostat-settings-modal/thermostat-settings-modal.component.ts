import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { NestService } from '../nest.service';

@Component({
  selector: 'app-thermostat-settings-modal',
  templateUrl: './thermostat-settings-modal.component.html',
  styleUrls: ['./thermostat-settings-modal.component.scss'],
})
export class ThermostatSettingsModalComponent implements OnInit {
  @Input() settingsObject;
  submitted = false;
  formData = {};

  constructor(private modalCtl: ModalController, private nestService: NestService, private toastController: ToastController) { }

  ngOnInit() {

    this.formData = this.settingsObject.params;
    this.settingsObject.inputFields.map(item => {

      this.formData = Object.assign({ [item.key]: '' }, this.formData);

    });

  }

  closeModal() {
    this.modalCtl.dismiss();
  }

  submit(form: NgForm) {

    if (form.valid) {
      
    const deviceId = this.settingsObject.deviceId;
    const userId = this.settingsObject.userId;
    const payload = {
      command: this.settingsObject.command,
      params: this.formData
    }

    this.nestService.changeDeviceSetting(userId, deviceId, payload).subscribe(res => {
      console.log(res);
      this.modalCtl.dismiss(true);
    }, err => {
      this.presentToast(err.error.error.message);
    });
  }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "danger",
      position: "bottom",
    });
    toast.present();
  }

}
