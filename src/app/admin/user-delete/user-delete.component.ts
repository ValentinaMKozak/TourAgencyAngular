import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  currentUser: User;
  errorMessage: string;

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      const id = this.activatedRoute.snapshot.params['id'];
      if (id) {
        this.userService.getUser(id).subscribe(
          user => this.currentUser = user,
          error => this.errorMessage = error
        );
      }
    }
      deleteUser() {
        this.userService.deleteUser(this.currentUser.id).subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
      }

      goBack() {
        this.router.navigate(['admin/users']);
      }
}

