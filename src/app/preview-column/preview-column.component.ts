import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-column',
  templateUrl: './preview-column.component.html',
  styleUrls: ['./preview-column.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PreviewColumnComponent {
  @Input() previewData: any = {};
} 