import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User } from '../_models/user';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ChangeUserRoles } from '../_models/changeroles';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://localhost:44359/api/';

  constructor(private authHttp: AuthHttp) { }

  public getUsers(): Observable<User[]> {
      return this.authHttp
        .get(this.baseUrl + 'users')
        .map(response => <User[]>response.json())
        .catch(this.handleError);
  }

  public getUser(id: string): Observable<User> {
      return this.authHttp
        .get(this.baseUrl + 'users/' + id)
        .map(response => <User>response.json())
        .catch(this.handleError);
  }

  public getUserRoles(id: string): Observable<ChangeUserRoles> {
      return this.authHttp
        .get(this.baseUrl + 'users/' + id + '/roles')
        .map(response => <ChangeUserRoles>response.json())
        .catch(this.handleError);
  }

  public updateUser(id: string, user: User) {
      return this.authHttp
        .put(this.baseUrl + 'users/' + id, user)
        .catch(this.handleError);
  }

  public createUser(user: User) {
      return this.authHttp
        .post(this.baseUrl + 'users/', user)
        .catch(this.handleError);
  }

  public deleteUser(id: string) {
      return this.authHttp
        .delete(this.baseUrl + 'users/' + id)
        .catch(this.handleError);
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
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
