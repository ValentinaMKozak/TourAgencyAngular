import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Role } from '../_models/role';

@Injectable({
    providedIn: 'root'
  })
  export class RoleService {

    baseUrl = 'https://localhost:44359/api/';

    constructor(private authHttp: AuthHttp) { }

    public getRoles(): Observable<Role[]> {
        return this.authHttp
          .get(this.baseUrl + 'roles')
          .map(response => <Role[]>response.json())
          .catch(this.handleError);
      }

    public getRole(id: string): Observable<Role> {
        return this.authHttp
          .get(this.baseUrl + 'roles/' + id)
          .map(response => <Role>response.json())
          .catch(this.handleError);
    }

    public createRole(role: Role) {
        return this.authHttp
          .post(this.baseUrl + 'roles/', role)
          .catch(this.handleError);
    }

    public updateRole(id: string, role: Role) {
        return this.authHttp
          .put(this.baseUrl + 'roles/' + id, role)
          .catch(this.handleError);
    }

    public deleteRole(id: string) {
        return this.authHttp
          .delete(this.baseUrl + 'roles/' + id)
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

