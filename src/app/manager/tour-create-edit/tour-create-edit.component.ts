import { TourService } from './../../_services/tour.service';
import { Tour } from './../../_models/tour';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tour-create-edit',
  templateUrl: './tour-create-edit.component.html',
  styleUrls: ['./tour-create-edit.component.css']
})
export class TourCreateEditComponent implements OnInit {

  currentTour = new Tour( null, null, null, null, null);
  errorMessage: string;
  tourForm: FormGroup;
  numberDays: number;
  currency: string[] = ['EUR', 'USD'];
  addNewDaily = false;

  constructor(private tourService: TourService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.getTourFromRoute();
  }

  public checkError(element: string, errorType: string) {
    return this.tourForm.get(element).hasError(errorType) &&
            this.tourForm.get(element).touched;
  }

  public onSubmit(tourForm: FormGroup) {

    this.currentTour.tourName = tourForm.value.tourName;
    this.currentTour.departureDate = tourForm.value.departureDate;
    this.currentTour.numberOfDays = tourForm.value.numberOfDays;
    this.currentTour.price = tourForm.value.price;
    this.currentTour.currency = tourForm.value.currency;
    if (!this.currentTour.tourId) {
      this.currentTour.created = new Date();
    }
    if (this.currentTour.tourId) {
        this.tourService.updateTour(this.currentTour)
          .subscribe(
            () => {

              this.goBack();
            },
            error => this.errorMessage =  error
          );
    } else {
        this.tourService.createTour(this.currentTour)
          .subscribe(
            () => this.goBack(),
            error => this.errorMessage = error
          );
    }
  }

  public addNewDailyProgram() {
    if (!this.addNewDaily) {
      this.addNewDaily = true;
    } else {
      this.addNewDaily = false;
    }
  }

  public goBack() {
    this.router.navigate(['manager/tours']);
  }

  private getTourFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params['id'];

      if (id) {
        this.tourService.getTour(id).subscribe(
          tour => {
            this.currentTour = tour;
            this.numberDays = tour.numberOfDays;
            this.tourForm.patchValue(this.currentTour);
          },
          error => this.errorMessage = error
        );
      } else {
        this.currentTour = new Tour( null, null, null, null, null);
        this.tourForm.patchValue(this.currentTour);
      }
    });
  }

  private buildForm() {
    this.tourForm = this.fb.group({
      tourName: ['', Validators.required],
      departureDate: ['', Validators.required],
      numberOfDays: ['', Validators.required],
      price: ['', Validators.required],
      currency: ['', Validators.required]
    });
  }

}
