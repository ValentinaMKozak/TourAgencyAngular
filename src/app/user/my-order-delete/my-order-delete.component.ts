import { OrderService } from 'src/app/_services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-my-order-delete',
  templateUrl: './my-order-delete.component.html',
  styleUrls: ['./my-order-delete.component.css']
})
export class MyOrderDeleteComponent implements OnInit {

  order: Order;
  errorMessage: string;

  constructor(private orderService: OrderService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.orderService.getOrder(id)
        .subscribe(
          order => this.order = order,
          error => this.errorMessage = error
        );
    }
  }

  public deleteOrder() {
    this.orderService.deleteOrder(this.order)
      .subscribe(
        () => this.goBack(),
        error => this.errorMessage = error
      );

  }

  public goBack() {
    this.router.navigate(['user/orders']);
  }

}
