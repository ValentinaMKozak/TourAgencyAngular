import { TransportService } from './../../_services/transport.service';
import { Component, OnInit } from '@angular/core';
import { Transport } from './../../_models/transport';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-transport-create-edit',
  templateUrl: './transport-create-edit.component.html',
  styleUrls: ['./transport-create-edit.component.css']
})
export class TransportCreateEditComponent implements OnInit {

  currentTransport: Transport;
  errorMessage: string;
  transportForm: FormGroup;

  constructor(private transportService: TransportService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.getTransportFromRoute();
  }

  public checkError(element: string, errorType: string) {
    return this.transportForm.get(element).hasError(errorType) &&
            this.transportForm.get(element).touched;
  }

  public onSubmit(transportForm: FormGroup) {
    this.currentTransport.transportName = transportForm.value.transportName;

    if (this.currentTransport.transportId) {
        this.transportService.updateTransport(this.currentTransport.transportId, this.currentTransport)
          .subscribe(
            () => {
              this.goBack();
            },
            error => this.errorMessage =  error
          );

    } else {
        this.transportService.createTransport(this.currentTransport)
          .subscribe(
            () => this.goBack(),
            error => this.errorMessage = error
          );
    }
  }

  public goBack() {
    this.router.navigate(['manager/transports']);
  }

  private getTransportFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params['id'];

      if (id) {
        this.transportService.getTransport(id).subscribe(
          transport => {
            this.currentTransport = transport;
            this.transportForm.patchValue(this.currentTransport);
          },
          error => this.errorMessage = error
        );
      } else {
        this.currentTransport = new Transport(null);
        this.transportForm.patchValue(this.currentTransport);
      }
    });
  }

  private buildForm() {
    this.transportForm = this.fb.group({
      transportName: ['', Validators.required]
    });
  }

}
