import { DailyProgramService } from './../../_services/dailyProgram.service';
import { Tour } from './../../_models/tour';
import { Component, OnInit, Input } from '@angular/core';
import { DailyProgram } from 'src/app/_models/dailyprogram';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TourService } from 'src/app/_services/tour.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily-program-editor',
  templateUrl: './daily-program-editor.component.html',
  styleUrls: ['./daily-program-editor.component.css']
})
export class DailyProgramEditorComponent implements OnInit {

  @Input() tour: Tour;
  @Input() dailyProgram: DailyProgram;
  currentDailyProgram = new DailyProgram( null, null, null);
  errorMessage: string;
  dailyProgramForm: FormGroup;

  constructor(private dailyProgramService: DailyProgramService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.checkDailyProgram();
    this.buildForm();
  }

  private checkDailyProgram() {
    if (this.dailyProgram) {
     this.currentDailyProgram = this.dailyProgram;
    }
  }

  public onSubmit(form: FormGroup) {
    this.currentDailyProgram.theme = form.value.theme;
    this.currentDailyProgram.description = form.value.description;
    this.currentDailyProgram.tourId = this.tour.tourId;
    if (this.currentDailyProgram.dailyProgramId) {
        this.dailyProgramService.updateDailyProgram(this.tour.tourId, this.currentDailyProgram)
          .subscribe(
            next => {
              this.dailyProgramForm.reset(this.tour);
            }, error => this.errorMessage = error
          );
    } else {
        this.dailyProgramService.createDailyProgram(this.tour.tourId, this.currentDailyProgram)
        .subscribe(
          next => {
            this.dailyProgramForm.reset(this.tour);
          }, error => this.errorMessage = error
        );
    }
  }

  public checkError(element: string, errorType: string) {
    return this.dailyProgramForm.get(element).hasError(errorType) &&
            this.dailyProgramForm.get(element).touched;
  }

  private buildForm() {
    this.dailyProgramForm = this.fb.group({
      theme: [this.currentDailyProgram.theme, Validators.required],
      description: [this.currentDailyProgram.description, Validators.required]
    });
  }
}

