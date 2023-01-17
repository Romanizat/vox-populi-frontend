import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Vote} from "../../@types/vote.model";

@Injectable({
  providedIn: 'root'
})
export class VoteServiceService {

  constructor(private http: HttpClient) {
  }


  createVote(vote: Vote): Observable<Vote> {
    return this.http.post<Vote>(`${environment.apiUrl}/votes/`, vote, {responseType: "json"});
  }

  updateVote(vote: Vote): Observable<Vote> {
    return this.http.put<Vote>(`${environment.apiUrl}/votes/`, vote, {responseType: "json"});
  }

  deleteVote(voteId: number | any): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/votes/${voteId}`, {responseType: "json"});
  }

}
