import { Component, OnInit, ViewChild } from '@angular/core';
import { VotersService } from '../services/voters.service';
import { NgForm } from '@angular/forms';
import { CandidatesService } from '../services/candidates.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  constructor(
    private votersAPI: VotersService,
    private candidatesAPI: CandidatesService
  ) {}

  candidates: any = [];
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  ngOnInit(): void {
    this.candidatesAPI.getCandidates().subscribe((res: any) => {
      this.candidates = res;
    });
  }

  @ViewChild('voterForm')
  voterForm!: NgForm;

  onVote(voter: {
    name: string;
    email: string;
    ssn: string;
    dob: Date;
    city: string;
    phone: string;
    votedFor: string;
  }) {
    this.votersAPI.hasVoted(voter).subscribe((res: any) => {
      if (res) {
        alert('You have already voted!');
      } else {
        if(voter.ssn.length !== 9) {
          alert('SSN must be 9 digits long!');
          return;
        }
        this.votersAPI.createVoter(voter).subscribe((res: any) => {
          console.log(res);
          this.voterForm.reset();
        });
      }
    });
  }
}
