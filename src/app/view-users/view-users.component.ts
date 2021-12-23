import {Component, OnInit} from '@angular/core';
import {IUser} from "../../@types/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserServicesService} from "../services/user-services.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  userList: IUser[] = [];
  dataSource = new MatTableDataSource<IUser>([]);
  displayedColumns: string[] = ["name", "lastName", "username", "banned"];

  constructor(private snackBar: MatSnackBar, private userService: UserServicesService) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getAllUsers(): void {
    this.userService.getAllUsers().toPromise().then(data => {
      this.userList = data;
      this.dataSource.data = this.userList;
    });
  }

  toggleUserBanStatus(userId: number | undefined, ban: boolean | undefined) {
    this.userService.toggleUserRecordStatus(userId).toPromise().then(() => {
      this.getAllUsers();
      if (ban) {
        this.openSnackBar("User successfully banned", "Close");
      } else {
        this.openSnackBar("User successfully unbanned", "Close");
      }
    });
  }
}
