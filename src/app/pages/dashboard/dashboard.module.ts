import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { PropertyListComponent } from './property-list/property-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConciergeListComponent } from "./concierge-list/concierge-list.component";
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { AskForAnythingModalComponent } from './ask-for-anything-modal/ask-for-anything-modal.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FontAwesomeModule,
        DashboardPageRoutingModule,
    ],
    declarations: [
        DashboardPage,
        PropertyListComponent,
        ConciergeListComponent,
        PromotionListComponent,
        AskForAnythingModalComponent
    ]
})
export class DashboardPageModule {}
