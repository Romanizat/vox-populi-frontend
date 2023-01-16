import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import jwt_decode from "jwt-decode"
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserServicesService} from "../app/services/user-services.service";

const tokenName: string = 'userToken';

@Injectable({providedIn: "root"})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar,
              private userService: UserServicesService) {
  }

  get userRoles(): string[] {
    let token = jwt_decode(this.userJwtToken);
    // @ts-ignore
    return token ? token.roles : [];
  }

  get userJwtToken(): string {
    return localStorage.getItem(tokenName)!;
  }

  get isLoggedIn(): boolean {
    return !!this.userJwtToken;
  }

  login(username: string, password: string): void {
    this.http.post(`${environment.apiUrl}/login`, {
      username,
      password
    }, {responseType: "text"}).toPromise().then(token => {
      if (token) {
        localStorage.setItem(tokenName, token);
        //this.router.navigate(["profile"]);
        // TODO: Currently commented until implemented
        this.router.navigate(["events"]);
      }
    }, error => {
      this.openSnackBar(error.error, "Close");
    });
  }

  logout(): void {
    localStorage.removeItem(tokenName);
    this.router.navigate([""]);
  }

  isAdmin(): boolean {
    return this.userRoles.includes("ROLE_ADMIN");
  }

  isRegularUser(): boolean {
    return this.userRoles.includes("ROLE_USER");
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  getUsernameFromToken(): string {
    // @ts-ignore
    return jwt_decode(this.userJwtToken).sub;
  }

  getLoggedInUser() {
    return this.userService.getUserByUsername(this.getUsernameFromToken()).toPromise();
  }

}
