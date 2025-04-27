import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProgressService } from '../services/progress.service';
import { ProgressColumnComponent } from '../shared/progress-column/progress-column.component';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBriefcase,
  faBuilding,
  faCalendarAlt,
  faMapMarkerAlt,
  faPlus,
  faTrash,
  faArrowLeft,
  faArrowRight,
  faListUl,
  faPen
} from '@fortawesome/free-solid-svg-icons';

interface PreviewData {
  firstName: string;
  surname: string;
  city: string;
  country: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-work-history',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgSelectModule,FontAwesomeModule],
  templateUrl: './work-history.component.html',
  styleUrls: ['./work-history.component.css']
})
export class WorkHistoryComponent implements OnInit {
  workHistoryForm!: FormGroup;
  cities = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'London' },
    { id: 3, name: 'Tokyo' },
    { id: 4, name: 'Paris' },
    { id: 5, name: 'Berlin' }
  ];
  
  countries = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'United Kingdom' },
    { id: 3, name: 'Japan' },
    { id: 4, name: 'France' },
    { id: 5, name: 'Germany' }
  ];
  
  availableSkills = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue.js' },
    { id: 4, name: 'Node.js' },
    { id: 5, name: 'TypeScript' },
    { id: 6, name: 'JavaScript' },
    { id: 7, name: 'HTML/CSS' },
    { id: 8, name: 'Python' },
    { id: 9, name: 'Java' },
    { id: 10, name: 'SQL' }
  ];

  // Font Awesome icons
  faBriefcase = faBriefcase;
  faBuilding = faBuilding;
  faCalendarAlt = faCalendarAlt;
  faMapMarkerAlt = faMapMarkerAlt;
  faPlus = faPlus;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faListUl = faListUl;
  faPen = faPen;

  constructor(private fb: FormBuilder) {
    this.workHistoryForm = this.fb.group({
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      currentlyWorking: [false],
      city: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
      achievements: this.fb.array([this.createAchievement()]),
      skills: [[]]
    });
  }

  ngOnInit(): void {
   
  }

  createAchievement(): FormGroup {
    return this.fb.group({
      achievement: ['', Validators.required]
    });
  }

  get achievements(): FormArray {
    return this.workHistoryForm.get('achievements') as FormArray;
  }

  addAchievement(): void {
    this.achievements.push(this.createAchievement());
  }

  removeAchievement(index: number): void {
    this.achievements.removeAt(index);
  }

  removeSkill(skill: any): void {
    const currentSkills = this.workHistoryForm.get('skills')?.value;
    this.workHistoryForm.get('skills')?.setValue(
      currentSkills.filter((s: any) => s.id !== skill.id)
    );
  }

  onCurrentlyWorkingChange(): void {
    if (this.workHistoryForm.get('currentlyWorking')?.value) {
      this.workHistoryForm.get('endDate')?.disable();
      this.workHistoryForm.get('endDate')?.setValue('');
    } else {
      this.workHistoryForm.get('endDate')?.enable();
    }
  }

  onSubmit(): void {
    if (this.workHistoryForm.valid) {
      console.log('Form submitted:', this.workHistoryForm.value);
      // Handle form submission
    }
  }

  onPrevious(): void {
    // Handle navigation to previous step
    console.log('Navigating to previous step');
  }

  showError(controlName: string) {
    const control = this.workHistoryForm.get(controlName);
    
  }

}