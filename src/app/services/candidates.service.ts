import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  constructor(private http: HttpClient) { }

  private url = 'https://electa-1-default-rtdb.firebaseio.com/';
  getCandidates() {
    return this.http
      .get<{ [key: string]: Candidate }>(`${this.url}/candidates.json`)
      .pipe(
        map((responseData) => {
          const candidatesArray: Candidate[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              candidatesArray.push({ ...responseData[key], id: key });
            }
          }
          return candidatesArray;
        })
      );
  }

  updateVotes(id:string, votes: number) {
    return this.http.patch(`${this.url}/candidates/${id}.json`, {votes});
  }
}
