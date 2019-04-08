import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Impressions tour';

  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.roles = this.authService.decodedToken.role;
    }
  }
}

