import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  templateCount =50;
  lastUpdated = new Date('2023-10-01T12:00:00Z');
  resumeCount = 10;
  userName = 'John Doe';
  createNewResume(){

  }
  importResume(){

  }

  openTemplates(){

  }
  viewAllResumes(){}
  editResume(){}
  downloadResume(id:any){}
  duplicateResume(id:any){}
  deleteResume(id:any){}
  recentResumes = [
    { title: 'Resume 1', updatedAt: new Date('2023-10-01') , id: 0},]
}
