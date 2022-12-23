import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SubscriptionPageRoutingModule } from "./subscription-routing.module";

import { SubscriptionPage } from "./subscription.page";
import { CheckoutComponent } from "@app/providers/checkout/checkout.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SubscriptionPageRoutingModule
    ],
    declarations: [SubscriptionPage, CheckoutComponent]
})
export class SubscriptionPageModule {}
