import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserListModule, UserFilter, appointmentEdit } from '../models/user';
import { ServiceService } from '../services/service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-beautician-list',
  templateUrl: './beautician-list.component.html',
  styleUrls: ['./beautician-list.component.css']
})
export class BeauticianListComponent {
  constructor(
    private service: ServiceService,
    private router: Router
  ) { }


  allData: IUserListModule[];
  data: IUserListModule[];
  userFilter: UserFilter;
  currentUserId: number;

  //readonly filter = new userEditModel();
  ngOnInit(): void {

    this.service.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id;
    });

    this.userFilter = new UserFilter();
    this.service.getUsers().subscribe(data => {
      data.forEach(d => {
        this.service.getFeedbacksByUser(d.id).subscribe(feedbacks => {
          var sum = 0;
          var count = 0;
          feedbacks.forEach(f => {
            sum += f.mark;
            count++;
          });
          d.rating = sum / count;
        });
      });
      this.allData = data.filter(t => t.role == "master");
      this.data = data.filter(t => t.role == "master");
    });
  }

  openUser(item: IUserListModule) {

    if (this.currentUserId)
      this.router.navigateByUrl(`/beautican-detail/${item.id}`);
    else
      this.router.navigateByUrl(`/login`);
  }

  filter() {
    if (this.userFilter.name)
      this.data = this.allData.filter(t => {
        var fullname = t.name + ' ' + t.surname;
        return fullname.indexOf(this.userFilter.name) > -1
      });

    if (this.userFilter.adress)
      this.data = this.allData.filter(t => t.adress.indexOf(this.userFilter.adress) > -1);

    if (this.userFilter.service)
      this.data = this.allData.filter(t => t.service.indexOf(this.userFilter.service) > -1);

    if (this.userFilter.ratingFrom && this.userFilter.ratingTo)
      this.data = this.allData.filter(t => t.rating <= this.userFilter.ratingTo && t.rating >= this.userFilter.ratingFrom);
    else if (this.userFilter.ratingFrom)
      this.data = this.allData.filter(t => t.rating >= this.userFilter.ratingFrom);
    else if (this.userFilter.ratingTo)
      this.data = this.allData.filter(t => t.rating <= this.userFilter.ratingTo);

  }

  clear() {
    this.userFilter = new UserFilter();
    this.data = this.allData;
  }
}
