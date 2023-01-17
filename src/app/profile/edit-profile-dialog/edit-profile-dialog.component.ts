import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../../@types/User";
import {UserServicesService} from "../../services/user-services.service";

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {
  user: IUser;
  oldPhoto: string | undefined;

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    profilePic: new FormControl('')
  });

  public file: any;

  // @ts-ignore
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<EditProfileDialogComponent>,
              private snackBar: MatSnackBar,
              private userService: UserServicesService) {
    if (data != null) {
      this.user = data;
    }
  }

  ngOnInit(): void {
    this.form.get("username")?.disable();
    this.form.get("username")?.setValue(this.user.username);
    this.form.get("email")?.setValue(this.user.email);
    this.form.get("firstName")?.setValue(this.user.name);
    this.form.get("lastName")?.setValue(this.user.lastName);
    this.oldPhoto = this.user.profilePhoto;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  fileEvent(fileInput: any): void {
    const me = this;
    this.file = fileInput.target.files[0];
    if (this.file.size > 1000000)
      this.openSnackBar("Image is too large", "Close");
    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = function () {
      me.user.profilePhoto = reader.result?.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  private getUserFormData(): IUser {
    return {
      email: this.user.email,
      // @ts-ignore
      name: this.form.get("firstName")?.value,
      id: this.user.id,
      // @ts-ignore
      lastName: this.form.get("lastName")?.value,
      profilePhoto: this.user.profilePhoto,
      // @ts-ignore
      password: this.form.get("password")?.value,
      // @ts-ignore
      username: this.form.get("username")?.value,
      banned: false
    };
  }

  updateProfile() {
    const user = this.getUserFormData();
    console.log(user);
    this.userService.update(user).toPromise().then(result => {
      this.user = result;
      this.openSnackBar("Changes saved.", "Zatvori");
      this.dialogRef.close(this.user);
    }, err => {
      this.openSnackBar(err.error.message, "Zatvori");
    });
  }


}
