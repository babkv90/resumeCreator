import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProgressService } from '../services/progress.service';
import { ProgressColumnComponent } from '../shared/progress-column/progress-column.component';
// import { PreviewColumnComponent } from '../shared/preview-column/preview-column.component';

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
  imports: [CommonModule, ProgressColumnComponent],
  templateUrl: './work-history.component.html',
  styleUrls: ['./work-history.component.css']
})
export class WorkHistoryComponent {
  previewData: PreviewData = {
    firstName: '',
    surname: '',
    city: '',
    country: '',
    phone: '',
    email: ''
  };

  constructor(
    private router: Router,
    private progressService: ProgressService
  ) {
    this.progressService.setCurrentStep(1); // Set current step to Work History
  }

  onJobSeeking() {
    this.progressService.completeStep(1); // Complete the work history step
    this.navigateToNext();
  }

  onDifferentReason() {
    this.progressService.completeStep(1); // Complete the work history step
    this.navigateToNext();
  }

  onSkip() {
   
    this.router.navigate(['/education']);
  }

  navigateToNext() {
    this.navigateToNext();
  }
} 