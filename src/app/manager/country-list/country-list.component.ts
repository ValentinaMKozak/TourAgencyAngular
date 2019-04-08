import { CountryService } from './../../_services/country.service';
import { Country } from './../../_models/country';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countries: Country[];
  errorMessage: string;

  constructor(private countryService: CountryService,
              private router: Router) { }

  ngOnInit() {
    this.getCountries();
  }

  private getCountries() {
    this.countryService.getCountries()
      .subscribe((countries: Country[]) => {
          this.countries = countries;
        },
        error => this.errorMessage = error
      );
  }

  public create() {
    this.router.navigate(['manager/countries/create']);
  }

  public update(selected: Country) {
    this.router.navigate(['manager/countries/edit', selected.countryId]);
  }

  public delete(selected: Country) {
    this.router.navigate(['manager/countries/delete', selected.countryId]);
  }

}
