import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { EducationDetailsComponent } from '../education-details/education-details.component';
import { WorkHistoryComponent } from '../work-history/work-history.component';
import { SkillsComponent } from '../skills/skills.component';
import { SummaryComponent } from '../summary/summary.component';
import { 
  faUser, 
  faGraduationCap, 
  faBriefcase, 
  faCogs, 
  faFileAlt, 
  faDownload,
  faEye,
  faChevronLeft,
  faChevronRight,
  faSave,
  faUndo,
  faRedo
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resume-builder-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule,
    PersonalInfoComponent,
    EducationDetailsComponent,
    WorkHistoryComponent,
    SkillsComponent,
    SummaryComponent
  ],
  templateUrl: './resume-builder-dashboard.component.html',
  styleUrls: ['./resume-builder-dashboard.component.css']
})
export class ResumeBuilderDashboardComponent {
  // Font Awesome icons
  faUser = faUser;
  faGraduationCap = faGraduationCap;
  faBriefcase = faBriefcase;
  faCogs = faCogs;
  faFileAlt = faFileAlt;
  faDownload = faDownload;
  faEye = faEye;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSave = faSave;
  faUndo = faUndo;
  faRedo = faRedo;

  currentStep = 1;
  totalSteps = 5;

  // Progress tracking
  progress = {
    personalInfo: 0,
    education: 0,
    experience: 0,
    skills: 0,
    summary: 0
  };

  constructor() {}

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  saveProgress() {
    // Save progress logic
  }

  previewResume() {
    // Preview logic
  }

  downloadResume() {
    // Download logic
  }

  undo() {
    // Undo logic
  }

  redo() {
    // Redo logic
  }

  calculateTotalProgress(): number {
    const values = Object.values(this.progress);
    return values.reduce((acc, curr) => acc + curr, 0) / values.length;
  }
}
