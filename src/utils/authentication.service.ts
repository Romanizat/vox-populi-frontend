import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import jwt_decode from "jwt-decode"
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

const tokenName: string = 'userToken';

@Injectable({ providedIn: "root" })
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

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
    this.http.post(`${environment.apiUrl}/login`, { username, password }, { responseType: "text" }).toPromise().then(token => {
      if (token) {
        localStorage.setItem(tokenName, token);
        this.router.navigate(["profile"]);
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
    return this.userRoles.includes("ADMIN");
  }

  isRegularUser(): boolean {
    return this.userRoles.includes("REGULAR_USER");
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
