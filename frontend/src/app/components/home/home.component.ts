import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public photoService: PhotoService) { } //Cambiar despues a private

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.photoService.getPhotos()
      .subscribe(res => {
        this.photoService.photos = res as Photo[];
        console.log(res);
      });
  }

}
