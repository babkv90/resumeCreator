import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
})
export class EducationDetailsComponent implements OnInit {
  educationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.educationForm = this.fb.group({
      educations: this.fb.array([
        this.createEducationFormGroup()
      ])
    });
  }

  ngOnInit(): void {
  }

  createEducationFormGroup(): FormGroup {
    return this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      gpa: ['', [Validators.min(0), Validators.max(4)]],
      description: ['']
    });
  }

  get educations(): FormArray {
    return this.educationForm.get('educations') as FormArray;
  }

  addEducation(): void {
    this.educations.push(this.createEducationFormGroup());
  }

  removeEducation(index: number): void {
    this.educations.removeAt(index);
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      console.log(this.educationForm.value);
      // Handle form submission
    }
  }
}
