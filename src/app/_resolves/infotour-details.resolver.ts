import { Injectable } from '@angular/core';
import { Tour } from '../_models/tour';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { TourService } from '../_services/tour.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class InfotourDetailsResolver implements Resolve<Tour> {

    constructor(private tourService: TourService,
                private router: Router,
                private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Tour> {
        return this.tourService.getTour(route.params['id'])
            .catch(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return Observable.of(null);
            });
    }

}
