import { Component, OnInit } from '@angular/core';
import { Tour } from '../_models/tour';
import { TourService } from '../_services/tour.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Order } from '../_models/order';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  tour: Tour;
  order = new Order(null, null);
  orderForm: FormGroup;
  errorMessage: string;

  constructor(private tourService: TourService,
              private orderService: OrderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.getTourById();
  }

  public goBack() {
    this.router.navigate(['infotours']);
  }

  public checkError(element: string, errorType: string) {
    return this.orderForm.get(element).hasError(errorType) &&
            this.orderForm.get(element).touched;
  }

  public onSubmit(orderForm) {
    this.order.tourId = this.tour.tourId;
    this.order.tourName = this.tour.tourName;

    this.order.firstName = orderForm.value.firstName;
    this.order.lastName = orderForm.value.lastName;
    this.order.dateOfBirthday = orderForm.value.dateOfBirthday;
    this.order.phoneNumber = orderForm.value.phoneNumber;
    this.order.email = orderForm.value.email;
    this.order.isBiometricPassport = orderForm.value.isBiometricPassport;
    this.order.serieAndNumberOfPassport = orderForm.value.serieAndNumberOfPassport;
    this.order.isBookingRailwayTicket = orderForm.value.isBookingRailwayTicket;
    this.order.isBookingAviaTicket = orderForm.value.isBookingAviaTicket;
    this.order.isVisaSupport = orderForm.value.isVisaSupport;
    this.order.isInsurance = orderForm.value.isInsurance;
    this.order.desiredHotelAccom = orderForm.value.desiredHotelAccom;

    this.orderService.createOrder(this.order)
          .subscribe(
            () => this.goBack(),
            error => this.errorMessage = error
          );
  }

  private buildForm() {
    this.orderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirthday: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      isBiometricPassport: ['', Validators.required],
      serieAndNumberOfPassport: ['', Validators.required],
      isBookingRailwayTicket: ['', Validators.required],
      isBookingAviaTicket: ['', Validators.required],
      isVisaSupport: ['', Validators.required],
      isInsurance: ['', Validators.required],
      desiredHotelAccom: ['', Validators.required]
    });
  }

  private getTourById() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params['id'];
      this.tourService.getTour(id)
      .subscribe((tour: Tour) => {
        this.tour = tour;
      },
      error => this.errorMessage = error);
    });
  }

}

