import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { ProgressService } from '../services/progress.service';
import { ResumeData } from '../shared/models/resume.model';

@Component({
  selector: 'app-template-viewer',
  imports: [CommonModule],
  templateUrl: './template-viewer.component.html',
  styleUrls: ['./template-viewer.component.scss'],
  standalone: true
})
export class TemplateViewerComponent implements OnInit {
  @Input() resumeData: ResumeData | null = null;
  @Input() elementId: string = 'resumeContainer1';
  @ViewChild('resumeContainer') resumeContainer!: ElementRef;
  
  isPrintMode = true;
  ContactDetails: any = [];
  latestFormData: any;
  isLoading = true;

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.currentFormData.subscribe(data => {
      if (Object.keys(data).length !== 0) {
        this.updateResumeData(data);
      }
    });

    // Try to load saved resume data if none is provided
    if (!this.resumeData) {
      const savedData = localStorage.getItem('resumeData');
      if (savedData) {
        this.resumeData = JSON.parse(savedData);
      }
    }
    this.isLoading = false;
  }

  private updateResumeData(data: any) {
    // Update only changed values
    Object.keys(data).forEach(key => {
      if (this.resumeData?.personalInfo.hasOwnProperty(key)) {
        this.resumeData.personalInfo[key as keyof typeof this.resumeData.personalInfo] = data[key];
      }
    });
    this.ContactDetails = [
      this.resumeData?.personalInfo.email,
      this.resumeData?.personalInfo.phone,
      this.resumeData?.personalInfo.linkedIn,
      this.resumeData?.personalInfo.portfolio
    ];
  }

  private getElement(): HTMLElement {
    const element = document.getElementById(this.elementId);
    if (!element) {
      throw new Error(`Element with ID '${this.elementId}' not found`);
    }
    return element;
  }

  async downloadPDF() {
    const element = this.getElement();
    await this.progressService.downloadPDF(element);
  }

  getFormattedAddress(): string {
    if (!this.resumeData?.personalInfo) return '';
    return this.resumeData.personalInfo.address;
  }

  getSocialLinks(): { platform: string, url: string }[] {
    if (!this.resumeData?.personalInfo) return [];
    
    const links = [];
    const { linkedIn, portfolio } = this.resumeData.personalInfo;
    
    if (linkedIn) links.push({ platform: 'LinkedIn', url: linkedIn });
    if (portfolio) links.push({ platform: 'Portfolio', url: portfolio });
    
    return links;
  }
}
