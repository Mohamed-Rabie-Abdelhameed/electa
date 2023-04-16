import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voter } from '../models/voter';

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
      city: string,
      phone: string,
      votedFor: string
    }>(`${this.url}/voters.json`, voter);
  }

  hasVoted(voter: Voter) {
    return this.http.get(`${this.url}/voters.json?orderBy="ssn"&equalTo="${voter.ssn}"`)
  }


}
