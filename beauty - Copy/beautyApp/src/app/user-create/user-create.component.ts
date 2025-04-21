import { Component, inject } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { userById, userEditModel } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

  constructor(
    private service: ServiceService,
    private router: Router
  ) { }

  readonly model = new userEditModel();

  nameError: boolean = false;
  surnameError: boolean = false;
  emailError: boolean = false;
  email2Error: boolean = false;
  passwordError: boolean = false;
  phoneError: boolean = false;
  descriptionError: boolean = false;
  servicesError: boolean = false;
  addresError: boolean = false;

  isNumeric = (val: string): boolean => {
    return !isNaN(Number(val));
  }

  ngOnInit() {
    this.model.name = '';
    this.model.surname = '';
    this.model.email = '';
    this.model.password = '';
    this.model.phoneNumber = '';
    this.model.role = 'client';
    this.model.adress = '';
    this.model.description = '';
    this.model.service = '';
  }

  create() {
    if (this.model.name == "")       
      this.nameError = true;
    
    if (this.model.surname == "")
      this.surnameError = true;

    var isEmail = this.model.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );



    if (this.model.email == "" || !isEmail) {
      this.emailError = true;
    }
    else {
      var emailData = new userById();
      emailData.email = this.model.email;
      this.service.getUserByEmail(emailData).subscribe(data => {
        if (data)
          this.email2Error = true;
      })
    }

    if (this.model.password.length < 8)
      this.passwordError = true;

    if (this.model.phoneNumber == "" || !this.isNumeric(this.model.phoneNumber))
      this.phoneError = true;

    if (this.model.role == 'master' && (this.model.adress == ""))
      this.addresError = true;

    if (this.model.role == 'master' && (this.model.description == ""))
      this.descriptionError = true;

    if (this.model.role == 'master' && (this.model.service == ""))
      this.servicesError = true;

    if (!this.nameError && !this.surnameError && !this.emailError && 
      !this.passwordError && !this.phoneError && !this.descriptionError && 
      !this.servicesError && !this.addresError) {
      this.service.createUser(this.model).subscribe(user => {
        this.router.navigateByUrl(`/my-profile/${user.id}`);
      });
    }
  }
}
