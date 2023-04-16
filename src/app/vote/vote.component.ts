import { Component, OnInit, ViewChild } from '@angular/core';
import { VotersService } from '../services/voters.service';
import { NgForm } from '@angular/forms';
import { CandidatesService } from '../services/candidates.service';
import { Candidate } from '../models/candidate';
import { Voter } from '../models/voter';

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

  candidates: Candidate[] = [];
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
    this.candidatesAPI.getCandidates().subscribe((res: Candidate[]) => {
      this.candidates = res;
      console.log(this.candidates);
    });
  }

  @ViewChild('voterForm')
  voterForm!: NgForm;

  onSubmit(voter:{
    name:string,
    email:string, 
    phone: string,
    ssn:string,
    state:string,
    dob: Date,
    candidate:string
  }) {
    var newVoter: Voter = {
      name: voter.name,
      email: voter.email,
      ssn: voter.ssn,
      phone: voter.phone,
      state: voter.state,
      dob: voter.dob,
      votedFor:voter.candidate,
    }
    this.votersAPI.hasVoted(newVoter).subscribe((res: boolean) => {
      if (res) {
        alert('You have already voted!');
      } else {
        console.log(newVoter.votedFor)
        const candidate = this.findCandidate(newVoter.votedFor);
        console.log(candidate);
        this.votersAPI.createVoter(newVoter).subscribe((res: any) => {
          this.voterForm.reset();
          console.log(candidate.id);
          this.candidatesAPI
            .updateVotes(candidate.id, candidate.votes + 1)
            .subscribe((res: any) => {
              console.log(res);
            });
        });
      }
    });
  }

  findCandidate(name: string): Candidate {
    return (
      this.candidates.find((candidate) => candidate.name === name)
    );
  }
}
