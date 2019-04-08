import { TourService } from './../../_services/tour.service';
import { Tour } from './../../_models/tour';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tour-delete',
  templateUrl: './tour-delete.component.html',
  styleUrls: ['./tour-delete.component.css']
})
export class TourDeleteComponent implements OnInit {

  currentTour: Tour;
  errorMessage: string;

  constructor(private tourService: TourService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.tourService.getTour(id)
        .subscribe(
          tour => this.currentTour = tour,
          error => this.errorMessage = error
        );
    }
  }

  public deleteTour() {
    this.tourService.deleteTour(this.currentTour)
      .subscribe(
        () => this.goBack(),
        error => this.errorMessage = error
      );
  }

  public goBack() {
    this.router.navigate(['manager/tours']);
  }

}



