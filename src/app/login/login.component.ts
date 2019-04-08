import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    if (this.loginForm.valid) {
        this.user = Object.assign({}, this.loginForm.value);
        this.authService.login(this.user).subscribe(() => {
         this.alertify.success('Вход на сайт произведен успешно');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.router.navigate(['/infotours']);
        });
    }
  }
}

