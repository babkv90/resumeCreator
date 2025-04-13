import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgressService } from '../services/progress.service';
import { ProgressColumnComponent } from '../shared/progress-column/progress-column.component';
// import { PreviewColumnComponent } from '../shared/preview-column/preview-column.component';
import { NavigationComponent } from "../navigation/navigation.component";

interface PreviewData {
  firstName: string;
  surname: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  pincode: string;
}

@Component({
  selector: 'app-resume-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressColumnComponent, NavigationComponent],
  templateUrl: './resume-dashboard.component.html',
  styleUrls: ['./resume-dashboard.component.css']
})
export class ResumeDashboardComponent {
  selectedEducation: string = '';
  currentSection: string = 'education-level';
  previewData: any = {
    educationLevel: '',
    workHistory: '',
    personalInfo: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize with any existing data
    this.previewData = {
      educationLevel: this.selectedEducation,
      workHistory: '',
      personalInfo: ''
    };
  }

  selectEducation(level: string): void {
    this.selectedEducation = level;
    this.previewData.educationLevel = this.getEducationDisplayName(level);
    
    // Update the radio button UI
    const options = document.querySelectorAll('.education-option');
    options.forEach(option => {
      const radio = option.querySelector('.radio-button');
      const dot = option.querySelector('.radio-dot');
      if (option.getAttribute('data-level') === level) {
        radio?.classList.add('border-blue-500');
        dot?.classList.remove('hidden');
      } else {
        radio?.classList.remove('border-blue-500');
        dot?.classList.add('hidden');
      }
    });
  }

  private getEducationDisplayName(level: string): string {
    switch(level) {
      case 'high_school':
        return 'High School Diploma';
      case 'associate':
        return 'Associate Degree';
      case 'bachelor':
        return "Bachelor's Degree";
      case 'master':
        return "Master's Degree";
      case 'doctorate':
        return 'Doctorate';
      case 'none':
        return 'No Formal Education';
      default:
        return '';
    }
  }

  navigateTo(section: string): void {
    switch(section) {
      case 'heading':
        this.router.navigate(['/resume-dashboard']);
        break;
      case 'work-history':
        this.router.navigate(['/work-history']);
        break;
      case 'education':
        // Already on education page
        break;
      case 'skills':
        this.router.navigate(['/skills']);
        break;
      case 'summary':
        this.router.navigate(['/summary']);
        break;
      case 'finalize':
        this.router.navigate(['/finalize']);
        break;
    }
  }
 
} 