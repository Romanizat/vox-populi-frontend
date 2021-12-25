import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../../@types/User";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class UserServicesService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiUrl}/users`, {responseType: "json"});
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/users/user-by-username/${username}`, {responseType: "json"});
  }

  toggleUserRecordStatus(userId: number | undefined): Observable<IUser> {
    return this.http.put<IUser>(`${environment.apiUrl}/users/${userId}/toggle`, {responseType: "json"});
  }

  save(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/users`, user, {responseType: "json"});
  }

}
