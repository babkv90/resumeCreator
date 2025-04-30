import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, UserInputs, ResumeResponse } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class TerminalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  resumeForm: FormGroup;
  currentStep = 1;
  totalSteps = 4;
  isLoading = false;
  error: string | null = null;
  generatedResume: ResumeResponse | null = null;
  suggestedTemplates: string[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.resumeForm = this.fb.group({
      skills: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      experience: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      job_target: ['', Validators.required],
      template_preferences: [[]]
    });
  }

  ngOnInit() {
    // Check for existing session
    const sessionId = this.apiService.getCurrentSession();
    if (sessionId) {
      this.loadExistingSession(sessionId);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Form array getters
  get skills() {
    return this.resumeForm.get('skills') as FormArray;
  }

  get experience() {
    return this.resumeForm.get('experience') as FormArray;
  }

  // Add new form controls
  addSkill(skill: string = '') {
    this.skills.push(this.fb.control(skill, Validators.required));
  }

  addExperience() {
    this.experience.push(this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      duration: ['', Validators.required],
      achievements: this.fb.array([])
    }));
  }

  addAchievement(experienceIndex: number, achievement: string = '') {
    const achievements = this.getAchievements(experienceIndex);
    achievements.push(this.fb.control(achievement, Validators.required));
  }

  getAchievements(experienceIndex: number): FormArray {
    return this.experience.at(experienceIndex).get('achievements') as FormArray;
  }

  // Navigation methods
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else if (this.currentStep === this.totalSteps) {
      this.generateResume();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Load existing session
  private loadExistingSession(sessionId: string) {
    this.apiService.getResumeBySession(sessionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.session?.inputs) {
            this.populateForm(response.session.inputs);
            this.generatedResume = response.session.generatedContent;
            this.suggestedTemplates = response.session.generatedContent?.suggestedTemplates || [];
          }
        },
        error: (error) => {
          console.error('Error loading session:', error);
          this.error = 'Failed to load existing session';
        }
      });
  }

  // Populate form with existing data
  private populateForm(inputs: any) {
    // Clear existing arrays
    while (this.skills.length) {
      this.skills.removeAt(0);
    }
    while (this.experience.length) {
      this.experience.removeAt(0);
    }

    // Add skills
    inputs.skills?.forEach((skill: string) => this.addSkill(skill));

    // Add experience entries
    inputs.experience?.forEach((exp: any) => {
      const expGroup = this.fb.group({
        title: [exp.title, Validators.required],
        company: [exp.company, Validators.required],
        duration: [exp.duration, Validators.required],
        achievements: this.fb.array([])
      });

      exp.achievements?.forEach((achievement: string) => {
        (expGroup.get('achievements') as FormArray).push(
          this.fb.control(achievement, Validators.required)
        );
      });

      this.experience.push(expGroup);
    });

    this.resumeForm.patchValue({
      job_target: inputs.jobTarget,
      template_preferences: inputs.templatePreferences
    });
  }

  // Generate resume
  generateResume() {
    if (this.resumeForm.valid) {
      this.isLoading = true;
      this.error = null;

      const userInputs: UserInputs = {
        skills: this.skills.value,
        experience: this.experience.value,
        job_target: this.resumeForm.get('job_target')?.value
      };

      this.apiService.generateResume(userInputs, this.resumeForm.get('template_preferences')?.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.generatedResume = response;
            this.suggestedTemplates = response.suggested_templates;
            this.apiService.setCurrentSession(response.session_id);
            this.navigateToPreview();
          },
          error: (error) => {
            this.isLoading = false;
            this.error = error.message || 'Failed to generate resume';
            console.error('Resume generation error:', error);
          }
        });
    }
  }

  // Navigation
  navigateToPreview() {
    if (this.generatedResume) {
      this.router.navigate(['/preview'], {
        state: {
          resumeData: this.generatedResume,
          templates: this.suggestedTemplates
        }
      });
    }
  }

  // Remove items from form arrays
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  removeExperience(index: number) {
    this.experience.removeAt(index);
  }

  removeAchievement(experienceIndex: number, achievementIndex: number) {
    this.getAchievements(experienceIndex).removeAt(achievementIndex);
  }
}