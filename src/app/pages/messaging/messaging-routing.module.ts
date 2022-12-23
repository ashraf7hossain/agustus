import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMessageComponent } from './add-message/add-message.component';

import { MessagingPage } from './messaging.page';
import { NewMessageUserComponent } from './new-message-user/new-message-user';


const routes: Routes = [
  {
    path: '',
    component: MessagingPage
  },
  {
    path: 'add-message',
    component: AddMessageComponent
  },
  {
    path: 'new-message',
    component: NewMessageUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagingPageRoutingModule {}
