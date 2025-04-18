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
  latestFormData: any;
  constructor(private progressService: ProgressService) {}
  formData: any = {
    firstName: 'Abinash',
    lastName: 'Kumar', 
    email: 'abiece@outlook.com',
    phone: '+91-8210834653',  
  };
  ContactDetails:any=[];
  async downloadPDF() {
    await this.progressService.downloadPDF('resume-content');
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
