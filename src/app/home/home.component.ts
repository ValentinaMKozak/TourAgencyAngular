import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  currentDate: Date;
  constructor() {
   }

  ngOnInit() {
    this.currentDate = new Date();
  }



}
