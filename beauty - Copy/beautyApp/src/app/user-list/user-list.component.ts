import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { IUserListModule } from '../models/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  constructor(
    private service: ServiceService,
    private router: Router
  ) { }

  data: IUserListModule[];

  //readonly filter = new userEditModel();
  ngOnInit() {
    this.service.getUsers().subscribe(data => {
      this.data = data;
    });
  }

  openUser(item: IUserListModule) {
    this.router.navigateByUrl(`/beautican-detail/${item.id}`);
  }
}
