import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-column',
  templateUrl: './progress-column.component.html',
  styleUrls: ['./progress-column.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProgressColumnComponent {
  @Input() currentStep: string = 'education';
  
  steps = [
    { id: 'personal', name: 'Personal Info', completed: true },
    { id: 'education', name: 'Education', completed: false },
    { id: 'work', name: 'Work History', completed: false },
    { id: 'skills', name: 'Skills', completed: false },
    { id: 'summary', name: 'Summary', completed: false }
  ];

  isStepActive(stepId: string): boolean {
    return this.currentStep === stepId;
  }

  isStepCompleted(stepId: string): boolean {
    const stepIndex = this.steps.findIndex(s => s.id === stepId);
    const currentStepIndex = this.steps.findIndex(s => s.id === this.currentStep);
    return stepIndex < currentStepIndex;
  }
} 