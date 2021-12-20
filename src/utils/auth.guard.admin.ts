import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})

export class AuthGuardAdmin implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn && this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}
