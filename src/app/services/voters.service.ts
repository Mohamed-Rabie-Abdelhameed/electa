import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voter } from '../models/voter';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotersService {

  private url = 'https://electa-1-default-rtdb.firebaseio.com/';


  constructor(private http: HttpClient ) { }

  createVoter(voter: Voter) {
    return this.http.post<{
      name: string,
      email: string,
      ssn: string,
      dob: Date,
      state: string,
      phone: string,
      votedFor: string
    }>(`${this.url}/voters.json`, voter);
  }

  hasVoted(voter: Voter): Observable<boolean> {
    return this.http.get<{ [key: string]: Voter }>(`${this.url}/voters.json`)
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              if (responseData[key].ssn === voter.ssn) {
                return true;
              }
            }
          }
          return false;
        })
      );
    
  }


}
