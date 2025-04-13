import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-progress-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-column.component.html',
  
  styles: [`
    .progress-column {
      // width: 25%;
      padding: 20px;
      // background-color: white;
      background-color: #F8F9FA;
    color: #212529;
    accent-color: #0D6EFD;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .vertical-progress {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .step {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 4px;
      background-color: #f8f9fa;
      transition: all 0.3s ease;
    }

    .step.completed {
      background-color: #e8f5e9;
    }

    .step.active {
      background-color: #bbdefb;
      font-weight: bold;
    }

    .step-number {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.3s ease;
    }

    .step.completed .step-number {
      background-color: #4caf50;
      color: white;
    }

    .step.active .step-number {
      background-color: #2196f3;
      color: white;
    }

    .step-name {
      font-size: 14px;
      color: #333;
    }

    .horizontal-progress {
      margin-top: auto;
    }

    .progress-bar {
      height: 8px;
      background-color: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background-color: #4caf50;
      transition: width 0.3s ease;
    }

    .progress-text {
      text-align: center;
      margin-top: 8px;
      font-size: 14px;
      color: #666;
    }

    @keyframes stepComplete {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1.05);
      }
    }

    .step.completed {
      animation: stepComplete 0.3s ease-in-out;
    }
    .theme-minimalist {
    background-color: #F8F9FA;
    color: #212529;
    accent-color: #0D6EFD;
  }
  `]
})
export class ProgressColumnComponent implements OnInit {
  steps: { name: string; completed: boolean }[] = [];
  currentStep = 0;
  progress = 0;

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.steps$.subscribe(steps => {
      this.steps = steps;
    });

    this.progressService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });

    this.progressService.progress$.subscribe(progress => {
      this.progress = progress;
    });
  }
} 