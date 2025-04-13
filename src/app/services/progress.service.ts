import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Step {
  name: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private steps: Step[] = [
    { name: 'Heading', completed: false },
    { name: 'Work History', completed: false },
    { name: 'Education', completed: false },
    { name: 'Skills', completed: false },
    { name: 'Summary', completed: false },
    { name: 'Finalize', completed: false }
  ];

  private currentStepSubject = new BehaviorSubject<number>(0);
  private stepsSubject = new BehaviorSubject<Step[]>(this.steps);
  private progressSubject = new BehaviorSubject<number>(0);

  currentStep$ = this.currentStepSubject.asObservable();
  steps$ = this.stepsSubject.asObservable();
  progress$ = this.progressSubject.asObservable();

  constructor() {
    this.updateProgress();
  }

  getSteps(): Step[] {
    return this.steps;
  }

  getCurrentStep(): number {
    return this.currentStepSubject.value;
  }

  setCurrentStep(step: number) {
    this.currentStepSubject.next(step);
  }

  completeStep(stepIndex: number) {
    this.steps[stepIndex].completed = true;
    this.stepsSubject.next([...this.steps]);
    this.currentStepSubject.next(stepIndex + 1);
    this.updateProgress();
  }

  private updateProgress() {
    const completedSteps = this.steps.filter(step => step.completed).length;
    const progress = (completedSteps / this.steps.length) * 100;
    this.progressSubject.next(progress);
  }

  resetProgress() {
    this.steps = this.steps.map(step => ({ ...step, completed: false }));
    this.stepsSubject.next([...this.steps]);
    this.currentStepSubject.next(0);
    this.updateProgress();
  }
} 