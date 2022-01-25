import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IEventParticipant} from "../../@types/EventParticipant";

@Injectable({
  providedIn: 'root'
})
export class EventSuggestionServicesService {

  constructor(private http: HttpClient) {
  }

  addEventParticipant(eventParticipant: IEventParticipant): Observable<IEventParticipant> {
    return this.http.post<IEventParticipant>(`${environment.apiUrl}/event-participants`, eventParticipant, {responseType: "json"});
  }
}
