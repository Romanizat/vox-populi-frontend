import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IEventParticipant} from "../../@types/EventParticipant";

@Injectable({
  providedIn: 'root'
})
export class EventParticipantServicesService {

  constructor(private http: HttpClient) {
  }

  addEventParticipant(eventParticipant: IEventParticipant): Observable<IEventParticipant> {
    return this.http.post<IEventParticipant>(`${environment.apiUrl}/event-participants`, eventParticipant, {responseType: "json"});
  }

  getEventParticipantByEventIdAndUserId(eventId: number, userId: number | any): Observable<IEventParticipant> {
    return this.http.get<IEventParticipant>(`${environment.apiUrl}/event-participants/${eventId}/${userId}`, {responseType: "json"});
  }

  getAllEventParticipantByEventId(eventId: number): Observable<IEventParticipant[]> {
    return this.http.get<IEventParticipant[]>(`${environment.apiUrl}/event-participants/event-id/${eventId}`, {responseType: "json"});
  }

  deleteEventParticipant(eventParticipantId: number | any): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/event-participants/${eventParticipantId}`, {responseType: "json"});
  }
}
