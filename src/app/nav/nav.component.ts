import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login(this.model).subscribe(data => {
       this.alertify.success('logged in successfuly');
    }, error => {
       this.alertify.error('Failed to login');
    }, () => {
       this.router.navigate(['/infotours']);
    });
   }

  public logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/infotours']);
  }

  public loggedIn() {
  return this.authService.loggedIn();
  }

  public isRole(roleCheck:  string) {
    return this.authService.isRole(roleCheck);
  }
}
