import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPostPageRoutingModule } from './view-post-routing.module';

import { ViewPostPage } from './view-post.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ViewPostPageRoutingModule
  ],
  declarations: [ViewPostPage]
})
export class ViewPostPageModule {}
