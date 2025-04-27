import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFileAlt,
  faDownload,
  faCopy,
  faTrash,
  faCloudUpload,
  faImages,
  faPlusCircle,
  faUser,
  faSignOutAlt,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  // Font Awesome icons
  faFileAlt = faFileAlt;
  faDownload = faDownload;
  faCopy = faCopy;
  faTrash = faTrash;
  faCloudUpload = faCloudUpload;
  faImages = faImages;
  faPlusCircle = faPlusCircle;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faBars = faBars;
  faTimes = faTimes;
  
  isMenuOpen = false;
  templateCount = 25;
  lastUpdated = new Date('2023-10-01T12:00:00Z');
  resumeCount = 0;
  downloadCount = 0;
  userName = 'John Doe';

  resumes = [
    {
      id: 1,
      title: 'Software Developer Resume',
      updatedAt: '2025-04-15'
    },
    {
      id: 2,
      title: 'Project Manager Resume',
      updatedAt: '2025-04-20'
    }
  ];

  recentResumes = [
    { title: 'Resume 1', updatedAt: new Date('2023-10-01') , id: 0},
  ];

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  downloadResume(id: number) {
    // Download logic here
  }

  duplicateResume(id: number) {
    // Duplicate logic here
  }

  deleteResume(id: number) {
    // Delete logic here
  }

  openTemplates() {
    // Open templates logic here
  }

  createNewResume() {
    // Create new resume logic here
  }

  importResume() {
    // Import resume logic here
  }

  navigateToBlogs() {
    this.router.navigate(['/blogs']);
  }

  navigateToContacts() {
    this.router.navigate(['/contact']);
  }

  navigateToAbooutMe() { 
    this.router.navigate(['/about_me']);
  }

  navigateToLogin() {  
    this.router.navigate(['/user_registration']);
  }
}
