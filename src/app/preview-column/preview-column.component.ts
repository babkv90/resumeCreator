import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, ElementRef, Injector, Input, OnDestroy, Type, ViewChild } from '@angular/core';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';

import { ResumeData } from '../shared/resume.model';
import { TemplateViewerComponent } from '../template-viewer/template-viewer.component';
import { TemplateGeneratorComponent } from "../template-generator/template-generator.component";
import { ProgressService } from '../services/progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-column',
  templateUrl: './preview-column.component.html',
  styleUrls: ['./preview-column.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, TemplateGeneratorComponent, TemplateViewerComponent]
})
export class PreviewColumnComponent  implements AfterViewInit ,OnDestroy{

  selectedPortal?: ComponentPortal<any>;
  private portalOutlet?: DomPortalOutlet;
  selectedTemplate = TemplateViewerComponent;
  // resumeData: ResumeData = {
  //   name: 'John Doe',
  //   email: 'john@example.com'
  // };
  @Input() set template(tpl: Type<any>) {
    this.loadTemplate(tpl);
  }

  @Input() resumeData!: ResumeData;

  @ViewChild('previewContainer', { static: true }) 
  previewContainer!: ElementRef;

  constructor(private http: HttpClient,  private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,private router: Router,
    private injector: Injector,private progressService:ProgressService) {}


  ngAfterViewInit() {
    this.portalOutlet = new DomPortalOutlet(
      this.previewContainer.nativeElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }

  navigateToUserRegistration() {
    this.router.navigate(['/user_registration']);
  }

  private loadTemplate(templateComponent: Type<any>) {
    if (!this.portalOutlet) return;

    this.portalOutlet.detach();
    this.selectedPortal = new ComponentPortal(templateComponent);
    const componentRef = this.portalOutlet.attach(this.selectedPortal);
    
    // Pass data to the template component
    componentRef.instance.data = this.resumeData;
    componentRef.changeDetectorRef.detectChanges();
  }

  // Removed duplicate ngOnDestroy implementation
  

  
  ngOnDestroy() {
    this.portalOutlet?.detach();
  }



} 