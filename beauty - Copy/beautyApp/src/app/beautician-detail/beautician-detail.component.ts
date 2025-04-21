import { Component, Inject } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserDetailModule, appointment, appointmentEdit, appointmentList, currentUser, userFeedbackEditModel, userById } from '../models/user';
import { DOCUMENT, formatDate } from '@angular/common';

@Component({
  selector: 'app-beautician-detail',
  templateUrl: './beautician-detail.component.html',
  styleUrls: ['./beautician-detail.component.css']
})
export class BeauticianDetailComponent {
  constructor(
    private service: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) { }

  user: IUserDetailModule;
  readonly rating = new userFeedbackEditModel();
  readonly appointment = new appointment();
  editing: boolean;

  allAppointments: appointmentList[];
  appointments: appointmentEdit[];
  ratings: userFeedbackEditModel[];
  editAppointment: appointmentEdit;
  editAppointmentSelected: boolean = false;
  date: Date = new Date();
  filterDate: string;
  filterDateInput: string;
  currentUserId: number;
  currentUser: currentUser;
  avgRating: number;

  openModal: boolean = false;
  modalDelete: number = 0;
  modalFeedback: number = 0;

  nameError: boolean = false;
  surnameError: boolean = false;
  emailError: boolean = false;
  email2Error: boolean = false;
  passwordError: boolean = false;
  phoneError: boolean = false;
  descriptionError: boolean = false;
  servicesError: boolean = false;
  addresError: boolean = false;

  dateError: boolean = false;
  timeStartError: boolean = false;
  timeEndError: boolean = false;
  appDescError: boolean = false;

  dateError2: boolean = false;
  timeStartError2: boolean = false;
  timeEndError2: boolean = false;
  appDescError2: boolean = false;

  isNumeric = (val: string): boolean => {
    return !isNaN(Number(val));
  }

  ngOnInit() {
    var m = '';
    var month = this.date.getMonth()+1;
    month.toString().length == 1 ? m = '0' + month.toString() : m = month.toString();
    var day = this.date.getDate().toString();
    day.length == 1 ? day = '0' + day : day = day;
    this.filterDate = this.date.getFullYear().toString() + '-' + m + '-' + day;
    this.load();
    this.editing = false;
    this.appointment.description = "";
    this.appointment.timeEnd = "";
    this.appointment.timeStart = "";
  }

  load() {
    this.service.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id;
      this.currentUser = user;
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.service.getUserById(id).subscribe((data: any) => {
          this.user = data;
          this.rating.userId = id;
          this.appointment.masterId = id;
          this.appointment.canceled = false;
        });

        this.service.getAppointmentsByMaster(id).subscribe((data: any) => {
          this.allAppointments = data;
          this.allAppointments.forEach(a => {
            if (a.clientId) {
              this.service.getUserById(a.clientId).subscribe((user: any) => {
                a.clientName = user.name;
                a.clientEmail = user.email;
                a.clientNumber = user.phoneNumber;
                a.clientSurname = user.surname;
              });
            }
          });
          this.appointments = this.allAppointments.filter(t => t.date == this.filterDate);
          this.editAppointment.id = 0;
        });

        this.service.getFeedbacksByUser(id).subscribe((data: any) => {
          this.ratings = data;
          var sum = 0
          this.ratings.forEach(r => sum += r.mark);
          this.avgRating = sum / this.ratings.length;
        });
      }
    });
  }

  edit() {
    this.editing = !this.editing;
  }

  createFeedback() {
    this.service.createFeedback(this.rating).subscribe(id => {
      this.load();
    });
  }

  createNewAppointment() {
    console.log(this.appointment.date);
    this.dateError2 = false;
    this.timeStartError2 = false;
    this.timeEndError2 = false;
    this.appDescError2 = false;

    if (!this.appointment.date)
      this.dateError2 = true;

    if (this.appointment.description == "")
      this.appDescError2 = true;

    if (this.appointment.timeEnd == "" || this.appointment.timeStart >= this.appointment.timeEnd)
      this.timeEndError2 = true;

    if (this.appointment.timeStart == "")
      this.timeStartError2 = true;

    if (!this.timeStartError2 && !this.appDescError2 && !this.timeEndError2 && !this.dateError2) {
      this.appointment.date = this.appointment.date.toLocaleString();
      this.appointment.masterId = this.currentUserId;
      this.service.createAppointment(this.appointment).subscribe(id => {
        this.load();
      });
    }
  }

  selectEditApp(id: number) {
    this.editAppointmentSelected = true;
    this.editAppointment = this.appointments.find(x => x.id == id);
  }

  saveEditAppointment() {
    this.dateError = false;
    this.timeStartError = false;
    this.timeEndError = false;
    this.appDescError = false;

    if (!this.editAppointment.date)
      this.dateError = true;

    if (this.editAppointment.description == "")
      this.appDescError = true;

    if (this.editAppointment.timeEnd == "" || this.editAppointment.timeStart >= this.editAppointment.timeEnd)
      this.timeEndError = true;

    if (this.editAppointment.timeStart == "")
      this.timeStartError = true;

    if (!this.timeStartError && !this.appDescError && !this.timeEndError && !this.dateError) {
      this.service.saveEditAppointment(this.editAppointment).subscribe(id => {
        this.editAppointmentSelected = false;
        this.load();
      });
    }
  }

  deleteAppointment(id: number) {
    this.openModal = true;
    this.modalDelete = id;
  }

  confirmDelete() {
    this.service.deleteAppointment(this.modalDelete).subscribe(id => {
      this.openModal = false;
      this.modalDelete = 0;
      this.load();
    });
  }

  cancelDelete() {
    this.openModal = false;
    this.modalDelete = 0;
  }

  deleteFeedback(id: number) {
    this.openModal = true;
    this.modalFeedback = id;
  }

  confirmFeedback() {
    this.service.deleteFeedback(this.modalFeedback).subscribe(id => {
      this.load();
      this.openModal = false;
      this.modalFeedback = 0;
    });
  }

  cancelFeedback() {
    this.openModal = false;
    this.modalFeedback = 0;
  }

  dateBack() {
    this.date.setDate(this.date.getDate() - 1);
    var m = '';
    var month = this.date.getMonth() + 1;
    month.toString().length == 1 ? m = '0' + month.toString() : m = month.toString();
    var day = this.date.getDate().toString();
    day.length == 1 ? day = '0' + day : day = day;
    this.filterDate = this.date.getFullYear().toString() + '-' + m + '-' + day;
    this.appointments = this.allAppointments.filter(t => t.date == this.filterDate);
  }

  dateNext() {
    this.date.setDate(this.date.getDate() + 1);
    var m = '';
    var month = this.date.getMonth() + 1;
    month.toString().length == 1 ? m = '0' + month.toString() : m = month.toString();
    var day = this.date.getDate().toString();
    day.length == 1 ? day = '0' + day : day = day;
    this.filterDate = this.date.getFullYear().toString() + '-' + m + '-' + day;
    this.appointments = this.allAppointments.sort().filter(t => t.date == this.filterDate);
  }

  updateCalcs() {
    this.date = new Date(this.filterDate);
    this.appointments = this.allAppointments.sort().filter(t => t.date == this.filterDate);
  }

  applyToAppointment(appointment: appointmentEdit) {
    if (this.currentUserId) {
      appointment.clientId = this.currentUserId;
      this.service.applyToAppointment(appointment).subscribe(id => {
      });
    } else {
      this.document.location.href = '/beauticans';
    }
  }

  editUser() {
    if (this.user.name == "")
      this.nameError = true;

    if (this.user.surname == "")
      this.surnameError = true;

    var isEmail = this.user.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );



    if (this.user.email == "" || !isEmail) {
      this.emailError = true;
    }
    else {
      var emailData = new userById();
      emailData.email = this.user.email;
      this.service.getUserByEmail(emailData).subscribe(data => {
        if (data)
          this.email2Error = true;
      })
    }

    if (this.user.password.length < 8)
      this.passwordError = true;

    if (this.user.phoneNumber == "" || !this.isNumeric(this.user.phoneNumber))
      this.phoneError = true;

    if (this.user.role == 'master' && (this.user.adress == ""))
      this.addresError = true;

    if (this.user.role == 'master' && (this.user.description == ""))
      this.descriptionError = true;

    if (this.user.role == 'master' && (this.user.service == ""))
      this.servicesError = true;

    if (!this.nameError && !this.surnameError && !this.emailError &&
      !this.passwordError && !this.phoneError && !this.descriptionError &&
      !this.servicesError && !this.addresError) {
      this.service.editUser(this.user).subscribe(id => {
        this.load();
      });
    }
  }
}
