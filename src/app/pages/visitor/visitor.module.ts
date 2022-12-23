import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorPageRoutingModule } from './visitor-routing.module';

import { VisitorPage } from './visitor.page';
import { CreateVisitorComponent } from './create-visitor/create-visitor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VisitorService } from './visitor.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorPageRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [VisitorPage, CreateVisitorComponent],
  providers: [VisitorService]
})
export class VisitorPageModule { }
