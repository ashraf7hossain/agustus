import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenancePageRoutingModule } from './maintenance-routing.module';

import { MaintenancePage } from './maintenance.page';
import { PendingRequestComponent } from './pending-request/pending-request.component';
import { CompleteRequestComponent } from './complete-request/complete-request.component';
import { DetailsRequestModalComponent } from './details-request-modal/details-request-modal.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddRequestComponent } from './add-request/add-request.component';
import { MaintenanceService } from './maintenance.service';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { StarRatingComponent } from './star-rating/star-rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenancePageRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    MaintenancePage,
    PendingRequestComponent,
    CompleteRequestComponent,
    DetailsRequestModalComponent,
    AddRequestComponent,
    AddFeedbackComponent,
    StarRatingComponent,
  ],
  providers: [MaintenanceService]
})
export class MaintenancePageModule { }
