import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ResumeDashboardComponent } from './resume-dashboard/resume-dashboard.component';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { EducationLevelComponent } from './education-level/education-level.component';
import { NgModule } from '@angular/core';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContactComponent } from './contact/contact.component';
import { AboutMeComponent } from './about-me/about-me.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
  // { path: '', redirectTo: '/resume-dashboard', pathMatch: 'full' },
  // { path: '', component: ResumeDashboardComponent },
  // { path: 'work-history', component: WorkHistoryComponent },
  // { path: 'personal-info', component: PersonalInfoComponent },
  
  { path: 'resume_builder', component: EducationLevelComponent },
  {path: 'user_registration', component: LoginComponent},
  {path: 'user_dashboard', component: UserDashboardComponent},
  {path: 'blogs', component: BlogsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about_me', component: AboutMeComponent}
  
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