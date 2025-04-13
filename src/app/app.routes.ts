import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ResumeDashboardComponent } from './resume-dashboard/resume-dashboard.component';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { EducationLevelComponent } from './education-level/education-level.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    // { path: '', component: LandingPageComponent },
  // { path: '', redirectTo: '/resume-dashboard', pathMatch: 'full' },
  // { path: '', component: ResumeDashboardComponent },
  { path: 'work-history', component: WorkHistoryComponent },
  { path: 'education-level', component: EducationLevelComponent },
  { path: '', component: EducationLevelComponent },
  // { path: 'heading', component: 'Heading', },
  // { path: 'work-history', component: 'Work History' },
  // { path: 'education-level', component: 'Education' },
  // { path: 'skills', component: 'Skills' },
  // { path: 'summary', component: 'Summary' },
  // { path: 'finalize', component: 'Finalize' }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  
  export class AppRoutingModule { } 