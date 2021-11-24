import {Component, DoCheck, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService} from "../utils/authentication.service";
import {adminMenu, userMenu} from "../utils/pageMenuItems";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'vox-populi';
  @ViewChild("sidenav", {static: false}) sidenav: MatSidenav;
  menuItems: IMenuItem[];
  opened: boolean;

  constructor(public authService: AuthenticationService) {
  }

  ngDoCheck(): void {
    if (window.location.pathname === "/") {
      this.opened = false;
    } else {
      if (this.authService.isAdmin()) {
        this.menuItems = adminMenu;
      } else if (this.authService.isRegularUser()) {
        this.menuItems = userMenu;
      }
    }
  }

  logout(): void {
    this.sidenav.close();
    this.authService.logout();
  }
}
