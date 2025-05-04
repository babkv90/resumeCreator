import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, ElementRef, Injector, Input, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TemplateViewerComponent } from '../template-viewer/template-viewer.component';
import { TemplateGeneratorComponent, Template } from '../template-generator/template-generator.component';
import { ProgressService } from '../services/progress.service';
import { ResumeAgentService } from '../services/resume-agent.service';
import { ResumeData } from '../shared/models/resume.model';

@Component({
  selector: 'app-preview-column',
  templateUrl: './preview-column.component.html',
  styleUrls: ['./preview-column.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, TemplateGeneratorComponent]
})
export class PreviewColumnComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('previewContainer', { static: true }) 
  previewContainer!: ElementRef;

  @Input() userIndustry: string = '';
  
  resumeData: ResumeData = {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      portfolio: ''
    },
    summary: '',
    skills: [],
    education: [],
    experience: [],
    template: 'modern'
  };

  selectedPortal?: ComponentPortal<TemplateViewerComponent>;
  private portalOutlet?: DomPortalOutlet;
  selectedTemplate?: Template;
  private resumeSubscription?: Subscription;
  
  constructor(
    private http: HttpClient,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private router: Router,
    private injector: Injector,
    private progressService: ProgressService,
    private resumeAgent: ResumeAgentService
  ) {}

  ngOnInit() {
    // Subscribe to resume data updates
    this.resumeSubscription = this.resumeAgent.resumeData$.subscribe(data => {
      if (data) {
        this.resumeData = data;
        this.updatePreview();
      }
    });
  }

  ngAfterViewInit() {
    this.portalOutlet = new DomPortalOutlet(
      this.previewContainer.nativeElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    if (!this.selectedTemplate) {
      this.loadDefaultTemplate();
    }
  }

  onTemplateSelected(template: Template) {
    this.selectedTemplate = template;
    this.loadTemplate(template.component);
    
    // Update resume data with selected template
    this.resumeData = {
      ...this.resumeData,
      template: template.id
    };
    this.updatePreview();
  }

  downloadPDF() {
    const componentInstance = this.selectedPortal?.attach(this.portalOutlet!)?.instance;
    if (componentInstance) {
      componentInstance.downloadPDF();
    }
  }

  private loadDefaultTemplate() {
    this.loadTemplate(TemplateViewerComponent);
  }

  private loadTemplate(templateComponent: any) {
    if (!this.portalOutlet) return;

    this.portalOutlet.detach();
    this.selectedPortal = new ComponentPortal(templateComponent);
    const componentRef = this.portalOutlet.attach(this.selectedPortal);
    
    if (componentRef.instance instanceof TemplateViewerComponent) {
      componentRef.instance.resumeData = this.resumeData;
    }
    componentRef.changeDetectorRef.detectChanges();
  }

  private updatePreview() {
    // If we have a template loaded, update its data
    if (this.selectedPortal && this.portalOutlet) {
      const componentRef = this.portalOutlet.attach(this.selectedPortal);
      if (componentRef && componentRef.instance instanceof TemplateViewerComponent) {
        componentRef.instance.resumeData = this.resumeData;
        componentRef.changeDetectorRef.detectChanges();
      }
    }
  }

  ngOnDestroy() {
    this.portalOutlet?.detach();
    if (this.resumeSubscription) {
      this.resumeSubscription.unsubscribe();
    }
  }
}