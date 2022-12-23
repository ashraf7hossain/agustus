import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './providers/auth.guard';
import { CheckTutorial } from './providers/check-tutorial.service';
// import { SignUpPage } from './pages/card/card';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'card',
    loadChildren: () => import('./pages/card/card.module').then(m => m.CardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forum',
    loadChildren: () => import('./pages/forum/forum.module').then(m => m.ForumPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/messaging/messaging.module').then(m => m.MessagingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'message-board',
    loadChildren: () => import('./pages/message-board/message-board.module').then(m => m.MessageBoardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'amenity',
    loadChildren: () => import('./pages/amenity/amenity.module').then(m => m.AmenityPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'event',
    loadChildren: () => import('./pages/event/event.module').then(m => m.EventPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./pages/maintenance/maintenance.module').then(m => m.MaintenancePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'nest-device',
    loadChildren: () => import('./pages/nest-device/nest-device.module').then(m => m.NestDevicePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'visitor',
    loadChildren: () => import('./pages/visitor/visitor.module').then(m => m.VisitorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'offer',
    loadChildren: () => import('./pages/offer/offer.module').then(m => m.OfferPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: "subscription",
    loadChildren: () =>
      import("./pages/subscription/subscription.module").then(
        m => m.SubscriptionPageModule
      )
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
