import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageBoardPageRoutingModule } from './message-board-routing.module';

import { MessageBoardPage } from './message-board.page';
import { MatCardModule } from '@angular/material/card';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { AddMessageGroupComponent } from './add-message-group/add-message-group.component';
import { MessageService } from '../messaging/messaging.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddMessageUserComponent } from './add-message-user/add-message-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FontAwesomeModule,
    MessageBoardPageRoutingModule
  ],
  declarations: [MessageBoardPage, ChatDetailComponent, AddMessageGroupComponent, AddMessageUserComponent],
  providers: [MessageService]
})
export class MessageBoardPageModule { }
