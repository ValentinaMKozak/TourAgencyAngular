import { CountryService } from './../../_services/country.service';
import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/_models/country';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-country-create-edit',
  templateUrl: './country-create-edit.component.html',
  styleUrls: ['./country-create-edit.component.css']
})
export class CountryCreateEditComponent implements OnInit {

  currectCountry: Country;
  errorMessage: string;
  countryForm: FormGroup;

  constructor(private countryService: CountryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.getCountryFromRoute();
  }

  public onSubmit(countryForm: FormGroup) {

    this.currectCountry.countryName = countryForm.value.countryName;
    if (this.currectCountry.countryId) {
        this.countryService.updateCountry(this.currectCountry.countryId, this.currectCountry)
          .subscribe(
            () => {
              this.goBack();
            },
            error => this.errorMessage =  error
          );
    } else {
        this.countryService.createCountry(this.currectCountry)
          .subscribe(
            () => this.goBack(),
            error => this.errorMessage = error
          );
    }
  }

  private getCountryFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params['id'];

      if (id) {
        this.countryService.getCountry(id).subscribe(
          country => {
            this.currectCountry = country;
            this.countryForm.patchValue(this.currectCountry);
          },
          error => this.errorMessage = error
        );
      } else {
        this.currectCountry = new Country(null);
        this.countryForm.patchValue(this.currectCountry);
      }
    });
  }

  private buildForm() {
    this.countryForm = this.fb.group({
      countryName: ['', Validators.required]
    });
  }

  public checkError(element: string, errorType: string) {
    return this.countryForm.get(element).hasError(errorType) &&
            this.countryForm.get(element).touched;
  }

  public goBack() {
    this.router.navigate(['manager/countries']);
  }
}
