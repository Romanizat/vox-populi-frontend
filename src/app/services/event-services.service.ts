import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IEvent} from "../../@types/Event";

@Injectable({
  providedIn: "root"
})

export class EventServicesService {

  constructor(private http: HttpClient) {
  }

  getAllEventsByUserId(userId: number): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${environment.apiUrl}/events/all-by-user-id/${userId}`, {responseType: "json"});
  }

  createEventByUserId(event: IEvent, userId: number | undefined): Observable<IEvent> {
    return this.http.post<IEvent>(`${environment.apiUrl}/events/create-event/${userId}`, event, {responseType: "json"});
  }

  getEventByEventId(eventId: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${environment.apiUrl}/events/${eventId}/`, {responseType: "json"});
  }
}
