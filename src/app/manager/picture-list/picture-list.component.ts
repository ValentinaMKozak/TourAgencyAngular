import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Picture } from './../../_models/picture';
import { Tour } from './../../_models/tour';
import { Component, OnInit, Input } from '@angular/core';
import { PictureService } from 'src/app/_services/picture.service';
import { constructor } from 'q';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import * as _ from 'underscore';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {

  baseUrl = 'https://localhost:44359/api/';

  @Input() tour: Tour;
  pictures: Picture[];
  errorMessage: string;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  currentMain: Picture;

  constructor(private pictureService: PictureService,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getPictures();
    this.initializeUploader();
  }

  private getPictures() {
    this.pictureService.getPictures(this.tour.tourId).subscribe(
          pictures => this.pictures = pictures,
          error => this.errorMessage = error
        );
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public initializeUploader() {
    this.uploader =  new FileUploader({
      url: this.baseUrl + 'tours/' + this.tour.tourId + '/pictures/upload/' + this.authService.decodedToken.nameid,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Picture = JSON.parse(response);
        const picture = {
          pictureId: res.pictureId,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.pictures.push(picture);
      }
    };
  }

  public setMainPicture(picture: Picture) {
    this.pictureService
      .setMainPicture(this.tour.tourId, picture.pictureId, this.authService.decodedToken.nameid)
      .subscribe(() => {
       this.currentMain = _.findWhere(this.pictures, {isMain : true});
       this.currentMain.isMain = false;
       picture.isMain = true;
      }, error => {
        this.alertify.error(error);
      });
  }

  public deletePicture(id: number) {
    this.alertify.confirm('Are you sure you want to delete this picture?', () => {
      this.pictureService
        .deletePicture(this.tour.tourId, id)
        .subscribe(() => {
          this.pictures.splice(_.findIndex(this.pictures, {id: id}), 1);
          this.alertify.success('Picture has been deleted');
        }, error => {
          this.alertify.error('Failed to delete picture');
        });
    });
  }

}

