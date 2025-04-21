import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes, provideRouter } from '@angular/router';

// routes
import { routes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { BeauticianListComponent } from './beautician-list/beautician-list.component';
import { BeauticianDetailComponent } from './beautician-detail/beautician-detail.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    BeauticianListComponent,
    BeauticianDetailComponent,
    MyprofileComponent,
    UserCreateComponent,
    UserListComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }

