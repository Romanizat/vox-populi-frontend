import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IEventSuggestion} from "../../@types/EventSuggestion";

@Injectable({
  providedIn: "root"
})

export class EventSuggestionServicesServices {

  constructor(private http: HttpClient) {
  }

  getAllEventSuggestionsForEvent(eventId: number): Observable<IEventSuggestion[]> {
    return this.http.get<IEventSuggestion[]>(`${environment.apiUrl}/event-suggestions/get-all-by-event/${eventId}`, {responseType: "json"});
  }

  createEventSuggestion(eventSuggestion: IEventSuggestion): Observable<IEventSuggestion> {
    return this.http.post<IEventSuggestion>(`${environment.apiUrl}/event-suggestions/`, eventSuggestion, {responseType: "json"});
  }
}


