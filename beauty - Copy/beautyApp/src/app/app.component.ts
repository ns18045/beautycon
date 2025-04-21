import { Component, Inject, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { currentUser, userEditModel } from './models/user';
import { ServiceService } from './services/service.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'beautyApp';
  constructor(
    private service: ServiceService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  readonly model = new userEditModel();
  isLoggedIn: boolean;
  currentUser: currentUser;

  ngOnInit() {
    this.service.getCurrentUser().subscribe(user => {
      user.id ? this.isLoggedIn = true : this.isLoggedIn = false;
      this.currentUser = user;
    });
  }

  logout() {
    this.service.logout().subscribe(data => {
      this.document.location.href = '/login';
    });
  }
}
