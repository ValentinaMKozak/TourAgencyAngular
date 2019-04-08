import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Country } from '../_models/country';
@Injectable({
    providedIn: 'root'
  })
export class CountryService  {

    baseUrl = 'https://localhost:44359/api/countries';

    constructor(private authHttp: AuthHttp) { }

    public getCountries(): Observable<Country[]> {
        return this.authHttp
          .get(this.baseUrl)
          .map(response => <Country[]> response.json())
          .catch(this.handleError);
    }

    public getCountry(countryId: number): Observable<Country> {
        return this.authHttp
          .get(this.baseUrl + '/' +  countryId)
          .map(response => <Country>response.json())
          .catch(this.handleError);
    }

    public createCountry(country: Country) {
        return this.authHttp
          .post(this.baseUrl, country)
          .catch(this.handleError);
    }

    public updateCountry(countryId: number, country: Country) {
        return this.authHttp
          .put(this.baseUrl + '/' + countryId, country)
          .catch(this.handleError);
    }

    public deleteCountry(countryId: number) {
        return this.authHttp
          .delete(this.baseUrl + '/' + countryId)
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
