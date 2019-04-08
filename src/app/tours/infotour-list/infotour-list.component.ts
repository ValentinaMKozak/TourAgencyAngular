import { Tour } from './../../_models/tour';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-infotour-list',
  templateUrl: './infotour-list.component.html',
  styleUrls: ['./infotour-list.component.css']
})
export class InfotourListComponent implements OnInit {

  tours: Tour[];
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.tours = data['tours'];
    });
  }

}
