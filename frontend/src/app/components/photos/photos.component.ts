import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo';
declare var M: any;

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [PhotoService]
})
export class PhotosComponent implements OnInit {
  thumbnail: string = '/assets/img/image.png'; // thumbnail
  fileToUpload: File = null; //<----
  p: number = 1;

  constructor(public photoService: PhotoService) { } //Cambiar despues a private

  ngOnInit() {
    this.getPhotos();
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.thumbnail = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  addPhoto(title, description, imageURL) {
    this.photoService.postPhoto(title.value, description.value, this.fileToUpload).subscribe(
      res => {
        this.thumbnail = '/assets/img/image.png';
        M.toast({ html: 'Saved successfully!', classes: 'rounded' });
        this.getPhotos();
      }
    );
  }

  getPhotos() {
    this.photoService.getPhotos()
      .subscribe(res => {
        this.photoService.photos = res as Photo[];
        console.log(res);
      });
  }

  editPhoto(photo: Photo) {
    this.photoService.selectedPhoto = photo;
  }

  deletePhoto(_id: string) {
    if (confirm('Are you sure want to delete it?')) {
      this.photoService.deletePhoto(_id)
        .subscribe(res => {
          this.getPhotos();
          M.toast({ html: 'Deleted successfully!', classes: 'rounded' });
        });
    }
  }

  resetForm(form?: NgForm) {
    form.reset();
  }

}//End class
