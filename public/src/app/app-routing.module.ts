import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }    from './not-found.component';
import { LoginLogComponent } from './login/login-log/login-log.component';
import { LoginRegComponent } from './login/login-reg/login-reg.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'reg', redirectTo: '/register', pathMatch: 'full' },
    {
        path: 'register',
        component: LoginRegComponent
    },
    {
        path: 'login',
        component: LoginLogComponent
    },
    {
      path: 'home',
      component: ChatComponent
    },
    { path: '**', component: PageNotFoundComponent }
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: false }
      )
    ],
    exports: [
      RouterModule
    ],
    providers: [
    ]
  })
  

  export class AppRoutingModule { }