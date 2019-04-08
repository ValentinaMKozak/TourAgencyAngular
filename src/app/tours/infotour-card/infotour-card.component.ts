import { Router } from '@angular/router';
import { Tour } from './../../_models/tour';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infotour-card',
  templateUrl: './infotour-card.component.html',
  styleUrls: ['./infotour-card.component.css']
})
export class InfotourCardComponent implements OnInit {

  @Input() tour: Tour;
  currentPrice: number;
  constructor(private router: Router) { }

  ngOnInit() {
    this.currentPrice = this.tour.price * 30;
  }

  public onSelect(selected: Tour) {
    this.router.navigate(['infotours/', selected.tourId]);
  }

}
