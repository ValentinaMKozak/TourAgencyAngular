import { DailyProgram } from 'src/app/_models/dailyprogram';
import { Tour } from './../../_models/tour';
import { Component, OnInit, Input } from '@angular/core';
import { DailyProgramService } from 'src/app/_services/dailyProgram.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-daily-program-list',
  templateUrl: './daily-program-list.component.html',
  styleUrls: ['./daily-program-list.component.css']
})
export class DailyProgramListComponent implements OnInit {

  @Input() tour: Tour;
  currentTourId: number;
  dailyPrograms: DailyProgram[];
  errorMessage: string;

  constructor(private dailyProgramService: DailyProgramService) { }

  ngOnInit() {
    this.currentTourId = this.tour.tourId;
    this.getDailyProgramsByTourId();
  }
  private getDailyProgramsByTourId() {
    this.dailyProgramService.getDailyPrograms(this.currentTourId)
    .subscribe((dailyPrograms: DailyProgram[]) => {
      this.dailyPrograms = dailyPrograms;
    },
      error => this.errorMessage = error);
  }

  public deleteDailyProgram() {
    const lastDailyProgram = this.dailyPrograms[this.dailyPrograms.length - 1];
    this.dailyProgramService.deleteDailyProgram(this.currentTourId, lastDailyProgram.dailyProgramId)
    .subscribe(() =>  {
      console.log('last dailyProgram was deleted');
    }, error => {
      this.errorMessage = error;
    });
  }


}

/*



 deleteUser() {
        this.userService.deleteUser(this.currentUser.id).subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
      }

      goBack() {
        this.router.navigate(['admin/users']);
      }
*/
