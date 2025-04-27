import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProgressService } from '../services/progress.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-template-viewer',
  imports: [CommonModule],
  templateUrl: './template-viewer.component.html',
  styleUrl: './template-viewer.component.scss'
})
export class TemplateViewerComponent {
  latestFormData: any;
  @Input() elementId: string = 'resumeContainer1';
  skills=['JavaScript', 'Angular', 'React', 'Node.js', 'Express.js', 'MongoDB'];
  isPrintMode = true;
  education=[
    { degree: 'B.Tech in Computer Science', institution: 'XYZ University', year: '2022' }];
    experience=[
      { position: 'Software Engineer', company: 'ABC Corp', duration: '2022-2023' ,title: 'Software Engineer','period':'',points:''}];
      personalInfo={name:"Abinash",email:'abiece@outlook.com',phone:'+91-8210834653',address:'Bhubaneswar, Odisha',linkedIn:'https://www.linkedin.com/in/abinash-kumar-123456789/',portfolio:'https://abinashkumar.com'};
      summary='Highly motivated and results-driven software engineer with a passion for developing innovative solutions. Proven ability to work collaboratively in a team environment and deliver high-quality software products.';
  constructor(private progressService: ProgressService) {}
  @ViewChild('resumeContainer') resumeContainer!: ElementRef;
  formData: any = {
    firstName: 'Abinash',
    lastName: 'Kumar', 
    email: 'abiece@outlook.com',
    phone: '+91-8210834653',  
  };
  ContactDetails:any=[];
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
  ngOnInit() {
    this.progressService.currentFormData.subscribe(data => {
    
      if(Object.keys(data).length !== 0){

        this.latestFormData = updateChangedValues(this.formData, data);
        function updateChangedValues(originalObj:any, newObj:any) {
          const updatedObj:any = {};      
          for (const key in newObj) {
            if (originalObj[key] !== newObj[key]) {
              updatedObj[key] = newObj[key];
            }
          }     
          return updatedObj;
        }
        this.ContactDetails = [this.formData.email,this.formData.phone,this.formData.linkedIn,this.formData.portfolio];
      }
     
    
    });
  }
}
