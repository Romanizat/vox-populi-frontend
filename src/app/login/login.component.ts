import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthenticationService} from "../../utils/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IUser} from "../../@types/User";
import {UserServicesService} from "../services/user-services.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, ErrorStateMatcher {
  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });
  registerForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  constructor(private router: Router,
              private authService: AuthenticationService,
              private userService: UserServicesService,
              private snackBar: MatSnackBar) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(["profile"]);
    }
  }

  ngOnInit(): void {
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  login(): void {
    let username = this.loginForm.get("username")?.value;
    let password = this.loginForm.get("password")?.value;
    this.authService.login(username, password);
  }

  register(): void {
    if (this.registerForm.valid) {
      let name = this.registerForm.get("firstName")?.value;
      let lastName = this.registerForm.get("lastName")?.value;
      let email = this.registerForm.get("email")?.value;
      let username = this.registerForm.get("username")?.value;
      let password = this.registerForm.get("password")?.value;
      let user: IUser = {
        name: name,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        banned: false
      }
      this.userService.save(user).toPromise().then(() => {
        this.registerForm.reset();
        this.openSnackBar("Successfully registered!", "Close");
      }, err => {
        this.openSnackBar(err.error.message, "Close");
      });

    } else {
      this.openSnackBar("Missing information in form", "Close");
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
