import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from '@angular/http';
import { Order } from '../_models/order';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
    providedIn: 'root'
  })
export class OrderService {
    baseUrl = 'https://localhost:44359/api/orders';

    constructor(private http: Http,
                private authHttp: AuthHttp) { }

    public getOrders(): Observable<Order[]> {
        return this.authHttp
          .get(this.baseUrl)
          .map(response => <Order[]> response.json())
          .catch(this.handleError);
    }

    public getOrdersByEmail(email: string): Observable<Order[]> {
        return this.authHttp
          .get(this.baseUrl + '/my/' + email)
          .map(response => <Order[]> response.json())
          .catch(this.handleError);
    }

    public getOrder(id: number): Observable<Order> {
        return this.authHttp
          .get(this.baseUrl + '/' + id)
          .map(response => <Order>response.json())
          .catch(this.handleError);
    }

    public createOrder(order: Order) {
        return this.http
          .post(this.baseUrl, order)
          .catch(this.handleError);
    }

    public deleteOrder(order: Order) {
        return this.authHttp
          .delete(this.baseUrl + '/' + order.orderId)
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
