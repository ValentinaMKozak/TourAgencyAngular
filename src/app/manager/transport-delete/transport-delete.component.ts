import { TransportService } from './../../_services/transport.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Transport } from './../../_models/transport';

@Component({
  selector: 'app-transport-delete',
  templateUrl: './transport-delete.component.html',
  styleUrls: ['./transport-delete.component.css']
})
export class TransportDeleteComponent implements OnInit {

  currentTransport: Transport;
  errorMessage: string;

  constructor(private transportService: TransportService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.transportService.getTransport(id)
        .subscribe(
          transport => this.currentTransport = transport,
          error => this.errorMessage = error
        );
    }
  }

  public deleteTransport() {
    this.transportService.deleteTransport(this.currentTransport.transportId)
      .subscribe(
        () => this.goBack(),
        error => this.errorMessage = error
      );
  }

  public goBack() {
    this.router.navigate(['manager/transports']);
  }

}
