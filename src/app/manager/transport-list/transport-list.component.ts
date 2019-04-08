import { Transport } from './../../_models/transport';
import { TransportService } from './../../_services/transport.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.css']
})
export class TransportListComponent implements OnInit {

  transports: Transport[];
  errorMessage: string;

  constructor(private transportService: TransportService,
              private router: Router) { }

  ngOnInit() {
    this.getTransports();

  }

  private getTransports() {
    this.transportService.getTransports()
    .subscribe((transports: Transport[]) => {
      this.transports = transports;
    },
    error => this.errorMessage = error
    );
  }

  public create() {
    this.router.navigate(['manager/transports/create']);
  }

  public update(selected: Transport) {
    this.router.navigate(['manager/transports/edit', selected.transportId]);
  }

  public delete(selected: Transport) {
    this.router.navigate(['manager/transports/delete', selected.transportId]);
  }

}
