import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PreviewColumnComponent } from '../preview-column/preview-column.component';
import { ProgressColumnComponent } from "../progress-column/progress-column.component";
import { ProgressService } from '../services/progress.service';
import { WorkHistoryComponent } from '../work-history/work-history.component';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { EducationDetailsComponent } from '../education-details/education-details.component';
import { SkillsComponent } from '../skills/skills.component';
import { SummaryComponent } from "../summary/summary.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faHome,
  faInfoCircle,
  faEnvelope,
  faSignInAlt,
  faTimes,
  faBars,
  faBlog
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-education-level',
  templateUrl: './education-level.component.html',
  styleUrls: ['./education-level.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PreviewColumnComponent,
    ProgressColumnComponent,
    WorkHistoryComponent,
    PersonalInfoComponent,
    EducationDetailsComponent,
    SkillsComponent,
    SummaryComponent,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class EducationLevelComponent implements OnInit {
  // Font Awesome Icons
  faHome = faHome;
  faInfoCircle = faInfoCircle;
  faEnvelope = faEnvelope;
  faSignInAlt = faSignInAlt;
  faBlog = faBlog;
  faTimes = faTimes;
  faBars = faBars;

  // Menu state
  isMenuOpen = false;

  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  selectedEducation: string = '';
  activeComponent: string | null = null;

  educationForm: FormGroup;
  educationLevels = [
    { value: 'high_school', label: 'High School' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private router: Router, private progressService: ProgressService, private fb: FormBuilder) {
    this.educationForm = this.fb.group({
      educationLevel: ['', Validators.required],
      institution: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      gpa: ['', [Validators.min(0), Validators.max(4)]],
      description: ['']
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    // Initialize with any existing data
    this.previewData = {
      educationLevel: this.selectedEducation,
      workHistory: '',
      personalInfo: ''
    };
    this.progressService.componentSelected$.subscribe(component => {
      this.activeComponent = component;
    });
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

  onNext(): void {
    if (this.educationForm.valid) {
      this.next.emit(this.educationForm.value);
    } else {
      // Mark all fields as touched to show validation messages
      Object.keys(this.educationForm.controls).forEach(key => {
        this.educationForm.get(key)?.markAsTouched();
      });
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  get educationLevel() { return this.educationForm.get('educationLevel'); }
  get institution() { return this.educationForm.get('institution'); }
  get fieldOfStudy() { return this.educationForm.get('fieldOfStudy'); }
  get startDate() { return this.educationForm.get('startDate'); }
  get endDate() { return this.educationForm.get('endDate'); }
  get gpa() { return this.educationForm.get('gpa'); }

  currentSection: string = 'education-level';
  previewData: any = {
    educationLevel: '',
    workHistory: '',
    personalInfo: ''
  };

  navigateToBlogs(): void {
    this.router.navigate(['/blogs']);
  }

  navigateToContacts(): void {
    this.router.navigate(['/contact']);
  }

  navigateToAboutMe(): void { 
    this.router.navigate(['/about_me']);
  }
 
  navigateToLogin(): void {  
    this.router.navigate(['/user_registration']);
  }
}