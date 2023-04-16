import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoteComponent } from './vote/vote.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { DoneComponent } from './done/done.component';

const routes: Routes = [
  { path: '', redirectTo: '/vote', pathMatch: 'full' },
  { path: 'vote', component: VoteComponent },
  { path: 'candidates', component: CandidatesComponent},
  {path: 'done', component: DoneComponent},
  { path: '**', redirectTo: '/vote' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
