import { Injectable } from '@angular/core';
import { JwtHelper,  tokenNotExpired } from 'angular2-jwt';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:44359/api/account/';
  userToken: any;
  decodedToken: any;
  roles: any[];
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }

  public login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions())
        .map((response: Response) => {
           const user = response.json();
           console.log(user);
           if (user) {

            localStorage.setItem('token', user.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);

            this.roles = this.decodedToken.role;
            console.log('all roles');
            console.log(this.roles);
            console.log(this.decodedToken);
            this.userToken = user.tokenString;
        }
        }).catch(this.handleError);
  }

  public register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions())
        .catch(this.handleError);
  }


  public isRole(roleCheck:  string) {
    const userRoles = this.roles;

    for (const role of userRoles) {
      if (role === roleCheck) { return true; }
    }
    return false;
  }

  public loggedIn() {
      return tokenNotExpired('token');
  }

  private requestOptions() {
    const headers = new Headers({'Content-type' : 'application/json'});
    return new RequestOptions({headers: headers});
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      console.log(applicationError);
        return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
        for (const key in serverError) {
            if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
            }
        }
    }
    return Observable.throw(
        modelStateErrors || 'Server error'
    );
  }
}
