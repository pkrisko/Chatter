import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';

import { LoginLogComponent } from './login/login-log/login-log.component';
import { LoginRegComponent } from './login/login-reg/login-reg.component';
import { PageNotFoundComponent} from './not-found.component';
// Services
import { UserService } from './services/user.service';
import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    UserComponent,
    UserEditComponent,
    UserNewComponent,
    UserListComponent,
    UserDetailsComponent,
    PageNotFoundComponent,


    LoginLogComponent,
    LoginRegComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
