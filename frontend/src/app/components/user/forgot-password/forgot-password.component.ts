import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.postForgot(form.value)
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
