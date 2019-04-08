import { Tour } from './../../_models/tour';
import { DailyProgramService } from 'src/app/_services/dailyProgram.service';
import { DailyProgram } from 'src/app/_models/dailyprogram';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily-program-create',
  templateUrl: './daily-program-create.component.html',
  styleUrls: ['./daily-program-create.component.css']
})
export class DailyProgramCreateComponent implements OnInit {

  @Input() tour: Tour;
  newDailyProgran = new DailyProgram( '', '', 0);
  errorMessage: string;
  dailyProgramForm: FormGroup;

  constructor(private dailyProgramService: DailyProgramService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  public checkError(element: string, errorType: string) {
    return this.dailyProgramForm.get(element).hasError(errorType) &&
            this.dailyProgramForm.get(element).touched;
  }

  private buildForm() {
    this.dailyProgramForm = this.fb.group({
      theme: ['', Validators.required],
      description: ['', Validators.required]
    });
  }


  public onSubmit(form: FormGroup) {
    this.newDailyProgran.theme = form.value.theme;
    this.newDailyProgran.description = form.value.description;
    this.newDailyProgran.tourId = this.tour.tourId;
    this.dailyProgramService.createDailyProgram(this.tour.tourId, this.newDailyProgran)
      .subscribe(next => {
      this.dailyProgramForm.reset(this.tour);
      }, error => this.errorMessage = error
      );
  }
}
