import { Component, Inject } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { loginUser } from '../models/user';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private service: ServiceService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  readonly loginuser = new loginUser();
  loginError: boolean = false;

  login() {
    this.service.login(this.loginuser).subscribe(id => {
      if (id != 0)
        this.document.location.href = '/beauticans';
      else
        this.loginError = true;
    });
  }
}
