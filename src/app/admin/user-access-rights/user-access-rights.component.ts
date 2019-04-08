import { RoleChecked } from './../../_models/rolechecked';
import { Role } from './../../_models/role';
import { ChangeUserRoles } from './../../_models/changeroles';
import { UserService } from 'src/app/_services/user.service';
import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-access-rights',
  templateUrl: './user-access-rights.component.html',
  styleUrls: ['./user-access-rights.component.css']
})

export class UserAccessRightsComponent implements OnInit {

  currentUser: User;
  currentUserId: string;
  currentUserRoles: string[];
  allRoles: Role[];
  allRolesLenght: number;

  combinedRoleList: Array<RoleChecked> = [];

  roleCheckForm: FormGroup;
  errorMessage: string;

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.getUserFromRoute();
  }

  private getUserFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params['id'];

        this.userService.getUser(id).subscribe(
          user => {
            this.currentUser = user;
            this.currentUserId = user.id;
            this.getUserRoles(this.currentUserId);
          },
          error => this.errorMessage = error
        );
      });
    }

  private createListWithUserRoles() {
      let isChecked = false;
      for (let i = 0; i < this.allRolesLenght; i++) {
        for (let y = 0; y < this.currentUserRoles.length; y++) {
          if (this.currentUserRoles[y] === this.allRoles[i].name) {
            isChecked = true;
          }
        }
        this.combinedRoleList.push({id: this.allRoles[i].id, name: this.allRoles[i].name, checked: isChecked });
        isChecked = false;
      }
  }



  private getUserRoles(id: string) {
    this.userService.getUserRoles(id).subscribe(
      userinfo => {
        this.allRoles = userinfo.allRoles;
        console.log( this.allRoles);
        this.allRolesLenght = userinfo.allRoles.length;
        this.currentUserRoles = userinfo.userRoles;
        this.createListWithUserRoles();
      },
      error => this.errorMessage = error
    );

  }

    public goBack() {
      this.router.navigate(['admin/users']);
    }

  private buildForm() {
    this.roleCheckForm = this.fb.group({
    });
  }
}


