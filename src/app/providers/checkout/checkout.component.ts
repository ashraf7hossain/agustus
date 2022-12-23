import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import { PaymentService } from "../payment.service";
import { environment as ENV } from "@environments/environment";
import { SubscriptionService } from "@app/pages/subscription/subscription.service";

declare var Stripe;

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements AfterViewInit {
  constructor(
    private paymentService: PaymentService,
    private subscriptionService: SubscriptionService
  ) {}

  @ViewChild("cardElement") cardElement: ElementRef;
  @Input() amount: number;
  @Input() description: string;
  @Input() subscription: any;
  @Input() priceId: string;

  @Output() successEmitter = new EventEmitter<number>();

  stripe; // : stripe.Stripe;
  card;
  elements;
  cardErrors;

  loading = false;
  confirmation;
  clientSecret: string;

  ngAfterViewInit() {
    this.initialize();
  }

  initialize() {
    this.stripe = Stripe(ENV.stripe.publish_key);
    if (this.priceId) {
      this.subscriptionService
        .createSubscriptionPaymentIntent(
          this.priceId,
          this.subscription.customerId
        )
        .subscribe(res => {
          this.clientSecret = res.clientSecret;
          const appearance = {
            theme: "stripe"
          };
          this.elements = this.stripe.elements({
            appearance,
            clientSecret: this.clientSecret
          });
          this.card = this.elements.create("payment");
          this.card.mount(this.cardElement.nativeElement);

          this.card.addEventListener("change", ({ error }) => {
            this.cardErrors = error && error.message;
          });
        });
    } else {
      this.paymentService.createPaymentIntent(this.amount).subscribe(res => {
        this.clientSecret = res.clientSecret;
        const appearance = {
          theme: "stripe"
        };
        this.elements = this.stripe.elements({
          appearance,
          clientSecret: this.clientSecret
        });
        this.card = this.elements.create("payment");
        this.card.mount(this.cardElement.nativeElement);

        this.card.addEventListener("change", ({ error }) => {
          this.cardErrors = error && error.message;
        });
      });
    }
  }

  async handleForm(e) {
    e.preventDefault();
    this.setLoading(true);
    const { error, paymentIntent } = await this.stripe.confirmPayment({
      elements: this.elements,
      redirect: "if_required"
    });
    if (paymentIntent) {
      this.checkStatus(paymentIntent);
    } else {
      if (error && error.message) {
        this.showMessage(error.message);
      } else {
        this.showMessage("An unexpected error occured.");
      }
    }

    this.setLoading(false);
  }

  // Fetches the payment intent status after payment submission
  checkStatus(paymentIntent) {
    if (!paymentIntent) {
      return;
    }

    switch (paymentIntent.status) {
      case "succeeded":
        this.showMessage("Payment succeeded!");
        this.successEmitter.emit(this.amount);
        break;
      case "processing":
        this.showMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        this.showMessage("Your payment was not successful, please try again.");
        break;
      default:
        this.showMessage("An unexpected error occured.");
        break;
    }
  }

  // ------- UI helpers -------

  showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function() {
      messageContainer.classList.add("hidden");
      messageText.textContent = "";
    }, 4000);
  }

  // Show a spinner on payment submission
  setLoading(isLoading) {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector("#submit")["disabled"] = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("#submit")["disabled"] = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
  }
}
