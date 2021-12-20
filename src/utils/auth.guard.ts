import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.authService.logout()
      this.router.navigate([""]);
      return false;
    }
  }
}
