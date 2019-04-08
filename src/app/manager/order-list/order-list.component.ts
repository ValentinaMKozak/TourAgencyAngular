import { Order } from './../../_models/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[];
  errorMessage: string;

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders() {
    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      error => this.errorMessage = error
    );
  }

  public onSelect(selected: Order) {
    this.router.navigate(['manager/orders', selected.orderId]);
  }

  public delete(selected: Order) {
    this.router.navigate(['manager/order/delete', selected.tourId]);
  }

}
