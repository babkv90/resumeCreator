import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-progress-column',
  templateUrl: './progress-column.component.html',
  styleUrls: ['./progress-column.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProgressColumnComponent implements AfterViewInit {
  @Input() currentStep: string = 'education';
  constructor(private router: Router,private progressService:ProgressService) {}
  ngOnInit(): void {
    // this.navigateTo('skills');
  }
  ngAfterViewInit(): void {
    this.selectComponent('personal-info');
  }
  steps = [
    { id: 'personal-info', name: 'Personal Info', completed: true,number:1 },
    { id: 'education-details', name: 'Education', completed: false,number:2 },
    { id: 'work-history', name: 'Work History', completed: false,number:3 },
    { id: 'skills', name: 'Skills', completed: false ,number:4},
    { id: 'summary', name: 'Summary', completed: false ,number:5}
  ];

  isStepActive(stepId: string): boolean {
    return this.currentStep === stepId;
  }

  isStepCompleted(stepId: string): boolean {
    const stepIndex = this.steps.findIndex(s => s.id === stepId);
    const currentStepIndex = this.steps.findIndex(s => s.id === this.currentStep);
    return stepIndex < currentStepIndex;
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

  @Output() componentSelected = new EventEmitter<string>();

 selectComponent (component: string) {
    // this.componentSelected.emit(component);
    console.log('Selected component:', component);
    this.progressService.selectComponent(component);
  }
} 