
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Transport } from '../_models/transport';

@Injectable({
    providedIn: 'root'
  })
export class TransportService  {

    baseUrl = 'https://localhost:44359/api/transports';

    constructor(private authHttp: AuthHttp) { }

    public getTransports(): Observable<Transport[]> {
        return this.authHttp
          .get(this.baseUrl)
          .map(response => <Transport[]> response.json())
          .catch(this.handleError);
    }

    public getTransport(transportId: number): Observable<Transport> {
        return this.authHttp
          .get(this.baseUrl + '/' +  transportId)
          .map(response => <Transport>response.json())
          .catch(this.handleError);
    }

    public createTransport(transport: Transport) {
        return this.authHttp
          .post(this.baseUrl, transport)
          .catch(this.handleError);
    }

    public updateTransport(transportId: number, transport: Transport) {
        return this.authHttp
          .put(this.baseUrl + '/' + transportId, transport)
          .catch(this.handleError);
    }

    public deleteTransport(transportId: number) {
        return this.authHttp
          .delete(this.baseUrl + '/' + transportId)
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
