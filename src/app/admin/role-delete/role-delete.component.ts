import { RoleService } from './../../_services/role.service';
import { Role } from './../../_models/role';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.css']
})
export class RoleDeleteComponent implements OnInit {

  currentRole: Role;
  errorMessage: string;

  constructor(private roleService: RoleService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.roleService.getRole(id).subscribe(
        role => this.currentRole = role,
        error => this.errorMessage = error
      );
    }
  }

  public deleteRole() {
    this.roleService.deleteRole(this.currentRole.id).subscribe(
      () => this.goBack(),
      error => this.errorMessage = error
    );
  }

  public goBack() {
    this.router.navigate(['admin/roles']);
  }

}
