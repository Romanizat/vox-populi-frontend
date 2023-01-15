import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {FormGroupDirective, NgForm, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthenticationService} from "../../utils/authentication.service";
import {Router} from "@angular/router";
import {IUser} from "../../@types/User";
import {UserServicesService} from "../services/user-services.service";
import {MatTabGroup} from "@angular/material/tabs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, ErrorStateMatcher {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl("", Validators.required),
    password: new UntypedFormControl("", Validators.required)
  });
  registerForm = new UntypedFormGroup({
    firstName: new UntypedFormControl("", [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
    lastName: new UntypedFormControl("", [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
    email: new UntypedFormControl("", [Validators.required, Validators.email]),
    username: new UntypedFormControl("", Validators.required),
    password: new UntypedFormControl("", Validators.required),
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

  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
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
        this.tabGroup.selectedIndex = 0;
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
