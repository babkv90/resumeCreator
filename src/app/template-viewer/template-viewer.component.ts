import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-template-viewer',
  imports: [CommonModule],
  templateUrl: './template-viewer.component.html',
  styleUrl: './template-viewer.component.css'
})
export class TemplateViewerComponent {
  constructor(private progressService: ProgressService) {}
  async downloadPDF() {
    await this.progressService.downloadPDF('resume-content');
  }
}
