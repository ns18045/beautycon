import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { BeauticianListComponent } from './beautician-list/beautician-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { BeauticianDetailComponent } from './beautician-detail/beautician-detail.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ChatComponent } from './chat/chat.component';
1
2
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'beauticans',
    component: BeauticianListComponent
  },
  {
    path: 'user-create',
    component: UserCreateComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'beautican-detail/:id',
    component: BeauticianDetailComponent
  },
  {
    path: 'my-profile',
    component: MyprofileComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];
