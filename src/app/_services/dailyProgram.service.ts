import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DailyProgram } from '../_models/dailyprogram';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
    providedIn: 'root'
  })
  export class DailyProgramService {
    baseUrl = 'https://localhost:44359/api/tours';

    constructor(private authHttp: AuthHttp) { }

    public getDailyPrograms(tourId: number): Observable<DailyProgram[]> {
        return this.authHttp
          .get(this.baseUrl + '/' + tourId + '/dailyprograms')
          .map(response => <DailyProgram[]> response.json())
          .catch(this.handleError);
    }

    public getDailyProgram(tourId: number, dailyProgramId: number): Observable<DailyProgram>  {
        return this.authHttp
          .get(this.baseUrl + '/' + tourId + '/dailyprograms/' + dailyProgramId)
          .map(response => <DailyProgram>response.json())
          .catch(this.handleError);
    }

    public createDailyProgram(tourId: number, dailyProgram: DailyProgram) {
        return this.authHttp
          .post(this.baseUrl + '/' + tourId + '/dailyprograms', dailyProgram)
          .catch(this.handleError);
    }

    public updateDailyProgram(tourId: number, dailyProgram: DailyProgram) {
        return this.authHttp
          .put(this.baseUrl + '/' + tourId + '/dailyprograms/', dailyProgram)
          .catch(this.handleError);
    }


    public deleteDailyProgram(tourId: number, dailyProgramId: number) {
        return this.authHttp
          .delete(this.baseUrl + '/' + tourId + '/dailyprograms/' + dailyProgramId)
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
