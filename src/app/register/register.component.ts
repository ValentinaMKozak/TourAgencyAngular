import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  model: any = {};
  errorMessage: string;
  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  public register() {
    if (this.registerForm.valid) {
        this.user = Object.assign({}, this.registerForm.value);
        console.log(this.user);
        this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
        }, error => {
         this.errorMessage = error;
          this.alertify.error(error);
        }, () => {
          console.log(this.user);
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/infotours']);
          });
        });
    }
  }

  private createRegisterForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
