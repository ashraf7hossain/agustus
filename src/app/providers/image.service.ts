import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { promise } from "protractor";

declare var faceapi;

@Injectable({
  providedIn: "root",
})
export class ImageService {
  constructor(private http: HttpClient) {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("assets/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("assets/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("assets/models"),
    ]);
  }
  async detectface(input_img: any, croppedImage: any) {
    console.log("called detectface", input_img);

    const output = await faceapi.detectAllFaces(input_img as HTMLImageElement);
    var detections = output[0].box;
    let res = await this.extractFaceFromBox(
      input_img,
      detections,
      croppedImage
    );
    // console.log("detecting face : ",res);
    return res;
  }
  async extractFaceFromBox(imageRef: any, box: any, croppedImage: any) {
    const regionsToExtract = [
      new faceapi.Rect(box.x, box.y, box.width, box.height),
    ];
    let faceImages = await faceapi.extractFaces(imageRef, regionsToExtract);

    if (faceImages.length === 0) {
      console.log("No face found");
    } else {
      faceImages.forEach((cnv: any) => {
        croppedImage.src = cnv.toDataURL();
        // console.log(cnv.toDataURL());
      });
      // setPic(faceImages.toDataUrl);
      //   console.log('face found ');
      //console.log(croppedImage.src);
      return croppedImage.src;
    }
  }
  base64ToImage(base64): HTMLImageElement {
    let img: HTMLImageElement = new Image();
    img.src = base64;
    return img;
  }
  async parseURI(d) {
    var reader = new FileReader();
    reader.readAsDataURL(d);
    return new Promise((res, rej) => {
      reader.onload = (e) => {
        res(e.target.result);
      };
    });
  }

  async getDataBlob(url) {
    var res = await fetch(url);
    var blob = await res.blob();
    var uri = await this.parseURI(blob);
    return uri;
  }
}
