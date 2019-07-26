import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 992;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(public user: UserService, private router: Router, zone: NgZone) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngOnInit() {
  }

  onLogout() {
    this.user.deleteToken();
    this.router.navigate(['/login']);
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}//End class
