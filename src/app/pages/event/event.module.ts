import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EventService } from './event.service';
import { MatNativeDateModule } from '@angular/material/core';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [EventPage, EventDetailsComponent, EventRegistrationComponent],
  providers: [EventService]
})
export class EventPageModule {}
