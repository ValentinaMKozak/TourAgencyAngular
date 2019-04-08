import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../../_services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css']
})
export class UserCreateEditComponent implements OnInit {

  currentUser: User;
  errorMessage: string;
  userForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.getUserFromRoute();
  }

  public checkError(element: string, errorType: string) {
    return this.userForm.get(element).hasError(errorType) &&
            this.userForm.get(element).touched;
  }

  public goBack() {
    this.router.navigate(['admin/users']);
  }

  public onSubmit(userForm: FormGroup) {
    this.currentUser.userName = userForm.value.userName;
    this.currentUser.email = userForm.value.email;
    this.currentUser.password = userForm.value.password;

    if (this.currentUser.id) {
      this.userService.updateUser(this.currentUser.id, this.currentUser)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    } else {
      this.userService.createUser(this.currentUser)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    }
  }

  private buildForm() {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private getUserFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params['id'];

      if (id) {
        this.userService.getUser(id).subscribe(
          user => {
            this.currentUser = user;
            this.userForm.patchValue(this.currentUser);
          },
          error => this.errorMessage = error
        );
      } else {
        this.currentUser = new User (null, null, null);
        this.userForm.patchValue(this.currentUser);
      }
    });
  }

}
