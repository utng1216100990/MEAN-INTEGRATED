import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.postReset(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.router.navigate(['/login']);
      });
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      _id: '',
      fullname: '',
      email: '',
      password: '',
      avatar: ''
    };
    form.resetForm();
  }

}
