import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
declare var M: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild(EditProfileComponent, null) edit: EditProfileComponent;
  userDetails;
  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute) { } //Cambiar despues a private

  ngOnInit() {
    this.userService.getUserProfile()
      .subscribe(
        res => {
          this.userDetails = res['user'];
        },
        err => { }
      )
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  editProfile() {
    this.router.navigate(['/edit']);
  }

}//End class
