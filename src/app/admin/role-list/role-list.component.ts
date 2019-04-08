import { Role } from './../../_models/role';
import { RoleService } from './../../_services/role.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: Role[];
  errorMessage: string;

  constructor(private roleService: RoleService,
              private router: Router) { }

  ngOnInit() {
    this.getRoles();
  }

  public create() {
    this.router.navigate(['admin/role/create']);
  }

  public update(selected: Role) {
    this.router.navigate(['admin/role/edit', selected.id]);
  }

  public delete(selected: Role) {
    this.router.navigate(['admin/role/delete', selected.id]);
  }

  private getRoles()  {
    this.roleService.getRoles()
    .subscribe((roles: Role[]) => {
      this.roles = roles;
    },
    error => this.errorMessage = error
    );
  }

}

