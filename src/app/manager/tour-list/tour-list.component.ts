import { TourService } from './../../_services/tour.service';
import { Tour } from './../../_models/tour';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  tours: Tour[];
  errorMessage: string;

  constructor(private tourService: TourService,
              private router: Router) { }

  ngOnInit() {
    this.getTours();
  }

  private getTours() {
    this.tourService.getTours()
      .subscribe((tours: Tour[]) => {
          this.tours = tours;
        },
        error => this.errorMessage = error
      );
  }

  public create() {
    this.router.navigate(['manager/tour/create']);
  }

  public update(selected: Tour) {
    this.router.navigate(['manager/tour/edit', selected.tourId]);
  }

  public delete(selected: Tour) {
    this.router.navigate(['manager/tour/delete', selected.tourId]);
  }

}
