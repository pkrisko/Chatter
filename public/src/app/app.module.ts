import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
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
    UserDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    UserService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
