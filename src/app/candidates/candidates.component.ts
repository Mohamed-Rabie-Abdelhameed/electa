import { Component } from '@angular/core';
import { CandidatesService } from '../services/candidates.service';
import { Candidate } from '../models/candidate';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {
  constructor(private candidatesAPI: CandidatesService) {}
  candidates: Candidate[] = [];

  ngOnInit() {
    this.fetchcandidates();
  }

  fetchcandidates() {
    this.candidatesAPI.getCandidates().subscribe((data) => {
      console.log(data);
      this.candidates = data;
    });
  }
}
