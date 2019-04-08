import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  errorMessage: string;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  public getRights(selected: User) {
    this.router.navigate(['admin/user/rights', selected.id]);
  }
  public create() {
    this.router.navigate(['admin/user/create']);
  }

  public update(selected: User) {
    this.router.navigate(['admin/user/edit', selected.id]);
  }

  public delete(selected: User) {
    this.router.navigate(['admin/user/delete', selected.id]);
  }

  private getUsers()  {
    this.userService.getUsers()
    .subscribe((users: User[]) => {
      this.users = users;
    },
    error => this.errorMessage = error
    );
  }

}
