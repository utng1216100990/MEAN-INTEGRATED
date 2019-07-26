import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(public user: UserService, private router: Router) { }

  onLogout() {
    this.user.deleteToken();
    this.router.navigate(['/login']);
  }
}
