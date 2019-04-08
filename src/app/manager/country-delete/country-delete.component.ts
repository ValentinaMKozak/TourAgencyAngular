import { CountryService } from './../../_services/country.service';
import { Country } from './../../_models/country';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-delete',
  templateUrl: './country-delete.component.html',
  styleUrls: ['./country-delete.component.css']
})
export class CountryDeleteComponent implements OnInit {

  currentCountry: Country;
  errorMessage: string;

  constructor(private countryService: CountryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.countryService.getCountry(id)
        .subscribe(
          country => this.currentCountry = country,
          error => this.errorMessage = error
        );
    }
  }

  public deleteCountry() {
    this.countryService.deleteCountry(this.currentCountry.countryId)
      .subscribe(
        () => this.goBack(),
        error => this.errorMessage = error
      );
  }

  public goBack() {
    this.router.navigate(['manager/countries']);
  }
}
