import { DailyProgram } from './../../_models/dailyprogram';
import { Picture } from './../../_models/picture';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TourService } from './../../_services/tour.service';
import { Tour } from './../../_models/tour';
import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-infotour-details',
  templateUrl: './infotour-details.component.html',
  styleUrls: ['./infotour-details.component.css'],
  providers: [
   DatePipe
 ]
})
export class InfotourDetailsComponent implements OnInit {

  tour: Tour;
  programs: DailyProgram[];
  pictures: Picture[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  priceHryvnia: number;
  tourCountry = '';

  constructor(private router: Router,
              private route: ActivatedRoute  ) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '600px',
        height: '450px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.route.data.subscribe(data => {
      this.tour = data['tour'];
    });
    this.programs = this.tour.dailyPrograms;
    this.pictures = this.tour.pictures;
    this.priceHryvnia = this.tour.price * 30;
    this.getCountriesFromTour();
    this.galleryImages = this.getPictures();

  }

  public makeOrder(selected: Tour) {
    this.router.navigate(['order/', selected.tourId]);
  }

  public goBack() {
    this.router.navigate(['infotours']);
  }

  private getPictures() {
    const pictureUrls = [];
    for (let i = 0; i < this.pictures.length; i++) {

      pictureUrls.push({
        small: this.pictures[i].url,
        medium: this.pictures[i].url,
        big: this.pictures[i].url,
        desctiprion: this.pictures[i].description
      });

    }
    return pictureUrls;
  }

  private getCountriesFromTour() {
    for (let i = 0; i < this.tour.countries.length; i++) {
      this.tourCountry += this.tour.countries[i].countryName + '       ';
    }
  }

}

