import { RoleService } from './../../_services/role.service';
import { Role } from './../../_models/role';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-role-create-edit',
  templateUrl: './role-create-edit.component.html',
  styleUrls: ['./role-create-edit.component.css']
})
export class RoleCreateEditComponent implements OnInit {

  currentRole: Role;
  errorMessage: string;
  roleForm: FormGroup;

  constructor(private roleService: RoleService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.getRoleFromRoute();
  }

  public onSubmit(roleForm: FormGroup) {
    this.currentRole.name = roleForm.value.name;

    if (this.currentRole.id) {
      this.roleService.updateRole(this.currentRole.id, this.currentRole)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    } else {
      this.roleService.createRole(this.currentRole)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    }
  }

  public checkError(element: string, errorType: string) {
    return this.roleForm.get(element).hasError(errorType) &&
            this.roleForm.get(element).touched;
  }

  public goBack() {
    this.router.navigate(['admin/roles']);
  }

  private buildForm() {
    this.roleForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  private getRoleFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params['id'];

      if (id) {
        this.roleService.getRole(id).subscribe(
          role => {
            this.currentRole = role;
            this.roleForm.patchValue(this.currentRole);
          },
          error => this.errorMessage = error
        );
      } else {
        this.currentRole = new Role (null);
        this.roleForm.patchValue(this.currentRole);
      }
    });
  }

}

