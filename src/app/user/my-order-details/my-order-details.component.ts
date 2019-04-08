import { Order } from './../../_models/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.css']
})
export class MyOrderDetailsComponent implements OnInit {

  order: Order;
  errorMessage: string;

  constructor(private orderService: OrderService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = +params['id'];
      this.orderService.getOrder(id)
      .subscribe((order: Order) => {
        this.order = order;
      },
      error => this.errorMessage = error);
    });
  }

  public goBack() {
    this.router.navigate(['user/orders']);
  }

}
