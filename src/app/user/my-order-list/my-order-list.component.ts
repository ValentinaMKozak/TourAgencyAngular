import { AuthService } from './../../_services/auth.service';
import { OrderService } from 'src/app/_services/order.service';
import { Order } from './../../_models/order';
import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-order-list',
  templateUrl: './my-order-list.component.html',
  styleUrls: ['./my-order-list.component.css']
})
export class MyOrderListComponent implements OnInit {

  orders: Order[];
  errorMessage: string;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders() {
    const email = this.authService.decodedToken.email;

    this.orderService.getOrdersByEmail(email).subscribe(
      orders => this.orders = orders,
      error => this.errorMessage = error
    );
  }

  public onSelect(selected: Order) {
    this.router.navigate(['user/orders', selected.orderId]);
  }

  public delete(selected: Order) {
    this.router.navigate(['user/orders/delete', selected.orderId]);
  }

}
