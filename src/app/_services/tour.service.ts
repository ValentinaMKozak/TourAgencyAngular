import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Tour } from '../_models/tour';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  baseUrl = 'https://localhost:44359/api/tours';

  constructor(private http: Http,
              private authHttp: AuthHttp) { }

  public getTours(): Observable<Tour[]> {
      return this.http
        .get(this.baseUrl)
        .map(response => <Tour[]> response.json())
        .catch(this.handleError);
  }

  public getTour(id: number): Observable<Tour> {
      return this.http
        .get(this.baseUrl + '/' + id)
        .map(response => <Tour>response.json())
        .catch(this.handleError);
  }

  public createTour(tour: Tour) {
      return this.authHttp
        .post(this.baseUrl, tour)
        .catch(this.handleError);
  }

  public updateTour(tour: Tour) {
      return this.authHttp
        .put(this.baseUrl + '/' + tour.tourId, tour)
        .catch(this.handleError);
   }

  public deleteTour(tour: Tour) {
      return this.authHttp
        .delete(this.baseUrl + '/' + tour.tourId)
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
