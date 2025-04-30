import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFileAlt, faDownload, faCopy, faTrash, faCloudUpload, faImages, 
  faPlusCircle, faUser, faSignOutAlt, faBars, faTimes, faBriefcase,
  faGraduationCap, faChartLine, faBell, faSearch, faCog, faHome,
  faBlog, faEnvelope, faInfoCircle, faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
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
  faBriefcase = faBriefcase;
  faGraduationCap = faGraduationCap;
  faChartLine = faChartLine;
  faBell = faBell;
  faSearch = faSearch;
  faCog = faCog;
  faHome = faHome;
  faBlog = faBlog;
  faEnvelope = faEnvelope;
  faInfoCircle = faInfoCircle;
  faSignInAlt = faSignInAlt;

  isMenuOpen = false;
  templateCount = 25;
  lastUpdated = new Date();
  resumeCount = 0;
  downloadCount = 0;
  userName = 'John Doe';
  userEmail = 'john.doe@example.com';
  userAvatar = 'assets/images/avatar-placeholder.jpg';

  dashboardStats = {
    totalApplications: 45,
    interviewInvites: 12,
    savedJobs: 28,
    profileViews: 156
  };

  resumes = [
    {
      id: 1,
      title: 'Software Developer Resume',
      updatedAt: '2025-04-15',
      template: 'Modern Professional',
      status: 'Complete',
      score: 92
    },
    {
      id: 2,
      title: 'Project Manager Resume',
      updatedAt: '2025-04-20',
      template: 'Executive Clean',
      status: 'In Progress',
      score: 78
    }
  ];

  recentActivities = [
    {
      type: 'application',
      company: 'Tech Corp',
      position: 'Senior Developer',
      date: new Date('2025-04-29'),
      status: 'Applied'
    },
    {
      type: 'interview',
      company: 'Innovation Labs',
      position: 'Lead Engineer',
      date: new Date('2025-04-28'),
      status: 'Scheduled'
    }
  ];

  jobRecommendations = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc',
      location: 'Remote',
      salary: '$120k - $150k',
      matchScore: 95
    },
    {
      title: 'Full Stack Engineer',
      company: 'Digital Ventures',
      location: 'New York, NY',
      salary: '$130k - $160k',
      matchScore: 88
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeDashboard();
  }

  initializeDashboard() {
    // Initialize dashboard data
    this.updateResumeStats();
    this.fetchJobRecommendations();
    this.fetchRecentActivities();
  }

  updateResumeStats() {
    this.resumeCount = this.resumes.length;
    this.downloadCount = this.calculateTotalDownloads();
  }

  calculateTotalDownloads(): number {
    // Implement download tracking logic
    return 15; // Placeholder
  }

  fetchJobRecommendations() {
    // Implement job recommendation logic
  }

  fetchRecentActivities() {
    // Implement activity tracking logic
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  downloadResume(id: number) {
    const resume = this.resumes.find(r => r.id === id);
    if (resume) {
      this.downloadCount++;
      // Implement actual download logic
      console.log(`Downloading resume: ${resume.title}`);
    }
  }

  duplicateResume(id: number) {
    const originalResume = this.resumes.find(r => r.id === id);
    if (originalResume) {
      const newResume = {
        ...originalResume,
        id: this.resumes.length + 1,
        title: `${originalResume.title} (Copy)`,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      this.resumes.push(newResume);
    }
  }

  deleteResume(id: number) {
    const index = this.resumes.findIndex(r => r.id === id);
    if (index !== -1) {
      this.resumes.splice(index, 1);
      this.updateResumeStats();
    }
  }

  createNewResume() {
    this.router.navigate(['/template-viewer']);
  }

  openTemplates() {
    this.router.navigate(['/template-generator']);
  }

  importResume() {
    // Implement resume import logic
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

  navigateToJobs() {
    // Implement job search navigation
  }

  navigateToSettings() {
    // Implement settings navigation
  }

  updateProfile() {
    // Implement profile update logic
  }
}
