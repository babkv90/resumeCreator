import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router : Router){}
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

    navigateToBlogs(){
      this.router.navigate(['/blogs']);
    }
  
    navigateToContacts(){
      this.router.navigate(['/contact']);
    }
  
    navigateToAbooutMe(){ 
      this.router.navigate(['/about_me']);
    }
   
    navigateToLogin(){  
      this.router.navigate(['/user_registration']);
    }
}
