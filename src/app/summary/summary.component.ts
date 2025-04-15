import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
})
export class SummaryComponent implements OnInit {
  summaryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.summaryForm = this.fb.group({
      professionalSummary: ['', [Validators.required, Validators.minLength(100)]],
      careerObjective: ['', [Validators.required, Validators.minLength(50)]],
      keyAchievements: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.summaryForm.valid) {
      console.log(this.summaryForm.value);
      // Handle form submission
    }
  }
}
