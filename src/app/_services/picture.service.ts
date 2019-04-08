import { AuthHttp } from 'angular2-jwt';
import { Picture } from './../_models/picture';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  baseUrl = 'https://localhost:44359/api/tours';

  constructor(private authHttp: AuthHttp,
              private authService: AuthService) { }

  public setMainPicture(tourId: number, pictureId: number, userId: string) {
      return this.authHttp
        .post(this.baseUrl + '/' + tourId + '/pictures/' + pictureId + '/setMain/' + userId, {})
        .catch(this.handleError);
  }

  public getPictures(tourId: number): Observable<Picture[]> {
      return this.authHttp
        .get(this.baseUrl + '/' + tourId + '/pictures')
        .map(response => <Picture[]> response.json())
        .catch(this.handleError);
  }

  public getPicture(tourId: number, pictureId: number): Observable<Picture> {
    return this.authHttp
            .get(this.baseUrl + '/' + tourId + '/pictures/' + pictureId)
            .map(response => <Picture>response.json())
            .catch(this.handleError);
  }

  public updatePicture(tourId: number, picture: Picture) {
      return this.authHttp
        .put(this.baseUrl + '/' + tourId + '/pictures/' + picture.pictureId, picture)
        .catch(this.handleError);
  }


  public deletePicture(tourId: number, pictureId: number) {
      return this.authHttp
        .delete(this.baseUrl + '/' + tourId + '/pictures/' + pictureId + '/' + this.authService.decodedToken.nameid)
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

