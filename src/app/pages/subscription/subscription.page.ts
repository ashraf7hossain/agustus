import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SubscriptionService } from "./subscription.service";
import { UserData } from "@app/providers/user-data";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {
  Plugins,
  CameraResultType,
  CameraSource,
  Filesystem,
} from "@capacitor/core";

import { options } from "sw-toolbox";
import { alertController } from "@ionic/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { environment } from "@environments/environment";
import { ImageService } from "@app/providers/image.service";


declare var faceapi;

const { Camera } = Plugins;

@Component({
  selector: "app-subscription",
  templateUrl: "./subscription.page.html",
  styleUrls: ["./subscription.page.scss"],
})
export class SubscriptionPage implements OnInit {
  private subscriptionData: any;
  userId: string;
  loadPayment: boolean = false;
  seletedPlan: any;
  subscriptionPackages = [
    {
      name: "Standard",
      price: "$5",
      priceId: "123",
      imageSrc: "assets/img/subscription/starter.png",
      period: "Per Month",
    },
    {
      name: "Premium",
      price: "$25",
      priceId: "456",
      imageSrc: "assets/img/subscription/professional.png",
      period: "Per Month",
    },
  ];
  products: any[] = [];
  prices: any[] = [];
  isModalOpen: boolean = false;

  @ViewChild("imageContent") imageContent: ElementRef;
  @ViewChild("original") OriginalimageContent: ElementRef;

  canvasVideo: any;
  constructor(
    private subscriptionService: SubscriptionService,
    private userData: UserData,
    private http: HttpClient,
    private storage: Storage,
    private alertControl: AlertController,
    private toastController: ToastController,
    private image: ImageService
  ) {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("assets/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("assets/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("assets/models"),
    ]);
  }

  httpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Bearer sk_test_51MERl5Hk6eXJ2rY05sv1WnlLgleUT0fce5l7qHms9XjLMjQ3SYS5iA7CTbpS7QnBY15h1AEE9vtMtUmY7asMLYpy00LoL5b1gj",
    // name: "Angular Master Class",
  });

  subscriptionList: any;
  imgUrl: string = "";
  async ngOnInit() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("assets/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("assets/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("assets/models"),
    ]);
    const { userId } = await this.userData.getUserData();
    this.userData.getUserSubscription().then(async (val) => {
      this.subscriptionData = val;
      if (!val) {
        const userEmail = await this.userData.getUsername();
        this.createUserSubscription(userId, userEmail);
      }
    });
    
    this.getEverything("products").subscribe((res: any) => {
      console.log(res);
      this.products = res.data;
      console.log(this.products);
    });
    setTimeout(() => {
      this.getEverything("prices").subscribe((res: any) => {
        let prices = res.data;
        console.log(prices);

        for (let x of prices) {
          this.products = this.products.map((product: any) => {
            if (product.id === x.product)
              return {
                ...product,
                unit_amount: x.unit_amount,
                price_id: x.price_id,
              };
            return product;
          });
        }
        console.log(this.products);
      });
    }, 100);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async verify(pin: string) {
    let user_stripe = await this.storage.get("stripe_user");
    let customerId = JSON.parse(user_stripe).stripe_customer_id;

    let httpData = new HttpParams()
      .set("pin", pin)
      .set("customer_id", customerId);
    this.http
      .post(`${environment.ngRok}/payment/verify_pin`, httpData)
      .subscribe(async (res: any) => {
        console.log(res);
        if (res.verified) {
          await this.takePhoto();
        } else {
          await this.presentToast(res.message);
        }
      });
  }
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // for web use Uri
      source: CameraSource.Prompt, // Camera, Photos or Prompt!
    });
    if (image) {
      const base64Image = image.dataUrl;
      this.imageContent.nativeElement.src = base64Image;

      let croppedImageBase64 = await this.image.detectface(
        this.imageContent.nativeElement,
        this.imageContent.nativeElement
      );
      // console.log("corpped Image ", croppedImageBase64);
      
      let imgId = await this.storage.get("profileImageId");
      let imgUrl = `${environment.baseUrl}/api/ProfileFile/${imgId}`;
  

      let origin64 = await this.image.getDataBlob(imgUrl);
      this.OriginalimageContent.nativeElement.src = origin64;
      console.log("base64 Original ",origin64);
      let croppedOriginal = await this.image.detectface(this.OriginalimageContent.nativeElement,this.OriginalimageContent.nativeElement);
      console.log("Cropped Original", croppedOriginal);
      
    }
  }
  async presentToast(msg: string, color = "danger") {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: color,
    });
    toast.present();
  }
  createUserSubscription(userId: string, userEmail: string) {
    this.subscriptionService
      .createSubscribeCustomer(userId, userEmail)
      .subscribe((res) => {
        this.subscriptionData = res;
        this.userData.setUserSubscription(res);
      });
  }

  onSelectPlan(planData) {
    this.loadPayment = planData ? true : false;
    this.seletedPlan = planData;
  }

  getEverything(route: string) {
    // let httpParams = new HttpParams().set()
    return this.http.get(`https://api.stripe.com/v1/${route}`, {
      headers: this.httpHeaders,
    });
  }
  getter(route: string) {
    // let httpParams = new HttpParams().set()
    this.http
      .get(`https://api.stripe.com/v1/${route}`, {
        headers: this.httpHeaders,
      })
      .subscribe((res) => {
        if (route === "subscriptions") {
          this.subscriptionList = res;
        }
        console.log(res);
      });
  }

  onSuccessPayment(data) {}
}
