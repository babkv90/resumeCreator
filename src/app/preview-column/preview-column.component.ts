import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-preview-column',
  templateUrl: './preview-column.component.html',
  styleUrls: ['./preview-column.component.css'],
  standalone: true,
  imports: [CommonModule,HttpClientModule]
})
export class PreviewColumnComponent  implements AfterViewInit{
  @ViewChild('resumeIframe') iframe!: ElementRef;
  @ViewChild('resumeTemplate') template!: ElementRef;
  constructor(private http: HttpClient) {}
  @Input() previewData: any = {
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    location: 'San Francisco, CA',
    summary: 'Experienced software engineer with 5+ years in web development...',
    experience: [
      {
        company: 'Tech Corp',
        position: 'Senior Developer',
        startDate: '2020',
        endDate: 'Present',
        responsibilities: [
          'Lead frontend development team',
          'Implemented Angular best practices',
          'Improved application performance by 40%'
        ]
      }
      // Add more experience items
    ]
    // Add more sections as needed
  };
  formData: any = {
    fullName: 'John Doe',
    summary: 'Experienced software engineer with a passion for developing innovative solutions.',
    skills: 'JavaScript, Angular, Node.js',
    experience: '5 years',
    education: 'Bachelor of Science in Computer Science',
  }

  ngAfterViewInit() {
    // this.updateIframeContent();
    // const iframe = this.template.nativeElement;
    // this.injectStyles();
    // iframe.onload = () => {
    //   console.log(50);
    //   this.injectStyles();
    // };
  }
  private readonly destroy$ = new Subject<void>();
  
  public injectStyles(): void {
    const iframeDocument = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow?.document;
  
    if (iframeDocument) {
      const link = iframeDocument.createElement('link');
      link.rel = 'stylesheet';
      link.href = './preview-column.component.scss'; 
      iframeDocument.head.appendChild(link);
      // Assuming your compiled CSS file is in the 'assets/styles' folder
      // this.http.get('./preview-column.component.scss', { responseType: 'text' })
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe(css => {
      //     const style = iframeDocument.createElement('style');
      //     style.textContent = css;
      //     iframeDocument.head.appendChild(style);
      //   });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

   private updateIframeContent() {
    const iframeDoc = this.iframe.nativeElement.contentDocument || 
                     this.iframe.nativeElement.contentWindow.document;
    
    // Get the template HTML
    let templateHtml = this.template.nativeElement.innerHTML;
    console.log(templateHtml)
    // Replace the Angular template syntax with actual values
    templateHtml = templateHtml
      .replace('{{fullName}}', this.formData.fullName || '')
      .replace('{{summary}}', this.formData.summary || '')
      .replace('*ngIf="summary"', this.formData.summary ? '' : 'style="display: none;"')
      .replace('*ngIf="skills"', this.formData.skills ? '' : 'style="display: none;"')
      .replace('*ngIf="experience"', this.formData.experience ? '' : 'style="display: none;"')
      .replace('*ngIf="education"', this.formData.education ? '' : 'style="display: none;"')
      .replace('[innerHTML]="experience"', `>${this.formData.experience || ''}<`)
      .replace('[innerHTML]="education"', `>${this.formData.education || ''}<`);
    
    // // Handle skills array
    // if (this.formData.skills) {
    //   const skillsList = this.formData.skills.split(',').map(skill => skill.trim());
    //   const skillsHtml = skillsList.map(skill => `<li>${skill}</li>`).join('');
    //   templateHtml = templateHtml.replace('<li *ngFor="let skill of skillsArray">{{skill}}</li>', skillsHtml);
    // } else {
    //   templateHtml = templateHtml.replace('<li *ngFor="let skill of skillsArray">{{skill}}</li>', '');
    // }

    iframeDoc.open();
    iframeDoc.write(templateHtml);
    iframeDoc.close();
  }

} 