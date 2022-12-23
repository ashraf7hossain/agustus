import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagingPageRoutingModule } from './messaging-routing.module';

import { MessagingPage } from './messaging.page';
import { AddMessageComponent } from './add-message/add-message.component';
import { MessageService } from './messaging.service';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewMessageUserComponent } from './new-message-user/new-message-user';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AccountService } from '@app/providers/account/account.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatCardModule,
        FontAwesomeModule,
        MessagingPageRoutingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSnackBarModule
    ],
    declarations: [MessagingPage, AddMessageComponent, NewMessageUserComponent],
    providers: [MessageService, AccountService]
})
export class MessagingPageModule {}
