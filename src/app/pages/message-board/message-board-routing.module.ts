import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMessageGroupComponent } from './add-message-group/add-message-group.component';
import { AddMessageUserComponent } from './add-message-user/add-message-user.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';


import { MessageBoardPage } from './message-board.page';
import { PeoplePage } from './people/people.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MessageBoardPage,
    children: [
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule),
      },
      {
        path: 'people',
        component: PeoplePage
      },
      {
        path: '',
        redirectTo: 'message-board/tabs/chat',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'chat-details',
    component: ChatDetailComponent
  },
  {
    path: 'add-message-group',
    component: AddMessageGroupComponent
  },
  {
    path: 'add-message-user/:messageGroupId',
    component: AddMessageUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageBoardPageRoutingModule { }
