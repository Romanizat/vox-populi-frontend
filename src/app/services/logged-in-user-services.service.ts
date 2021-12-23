import {Injectable} from "@angular/core";
import {IUser} from "../../@types/User";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class LoggedInUserServicesService {
  private user: IUser;

  constructor(private http: HttpClient) {
  }

  getLoggedInUser(): Observable<IUser> {
    if (this.user) {
      return new Observable<IUser>(observer => {
        observer.next(this.user);
        observer.complete();
      });
    }
    return this.http.get<IUser>(`${environment.apiUrl}/users/logged-in`, {responseType: "json"});
  }
}
