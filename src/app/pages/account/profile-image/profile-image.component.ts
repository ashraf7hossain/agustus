import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/providers/account/account.service';
import { UserData } from '@app/providers/user-data';
import { Plugins, CameraResultType, CameraSource, Filesystem } from '@capacitor/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';

const { Camera } = Plugins;

declare var faceapi;

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
})
export class ProfileImageComponent implements OnInit {

  @ViewChild('imageContent') imageContent: ElementRef;
  username: string;
  userId: string;
  imageUrl: string;
  imageFiles: Array<any> = [];
  isLoader =  false;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    private plt: Platform,
    private accountService: AccountService,
    private toastController: ToastController
  ) { 

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("assets/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("assets/models"),
    ]);
  }

  ngOnInit() {
    this.getUsername();
    this.getUserId();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }
  async getUserId(){
    const {userId} =  await this.userData.getUserData();
    this.userId =  userId;
  }


  async takePhoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // for web use Uri
      source: CameraSource.Prompt // Camera, Photos or Prompt!
  });
  console.log("Button clicked");
  
  if (image) {
      this.isLoader =  true;
      //  const base64Image = await this.readAsBase64(image); // for web 
      const base64Image = image.dataUrl;
      this.imageContent.nativeElement.src = base64Image;
       this.detectFromImage(this.imageContent.nativeElement, base64Image);
   }
   
  }

  async detectFromImage(imageElement: any, imageRaw: any){

    const canvas = faceapi.createCanvasFromMedia(imageElement);
    const displaySize = { width: imageElement.width, height: imageElement.height };
    faceapi.matchDimensions(canvas, displaySize);
    
    const detections = await faceapi
    .detectAllFaces(imageElement, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks();
    if (detections && detections.length) {
      this.imageFiles.unshift(imageRaw);
    }else{
      const msg = 'No Face Detect! Please Try again. ';
      this.presentToast(msg);
    }
    this.isLoader = false;
  
  }

  private async readAsBase64(photo) {
    
    if (this.plt.is('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path
        });
        return (  `data:image/${photo.format};base64,${file.data}`);
    }
    else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath);
        const blob = await response.blob();
 
        return await this.convertBlobToBase64(blob) as string;
    }
}
 
removeImage(index){
  this.imageFiles.splice(index, 1);

}
// Helper function
convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

uploadImage(){
  this.isLoader =  true;
  this.accountService.uploadprofileimages(this.imageFiles, this.userId).subscribe(res => {
    this.isLoader =  false;
    const msg = 'Upload image successfully.'
    const imageId = res;
    this.userData.setUserProfileImageId(imageId);
    this.presentToast(msg, 'success');
    this.router.navigate(['/account'])
  }, 
    er => {
   this.isLoader =  false;
   const msg = 'There is an error to uplaod image.Please try angain later.'
   this.presentToast(msg);
  })
}
async presentToast(msg: string, color='danger') {
  const toast = await this.toastController.create({
    message: msg,
    duration: 4000,
    color: color
  });
  toast.present();
}

}
