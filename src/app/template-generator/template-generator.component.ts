import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Type } from '@angular/core';
import { TemplateViewerComponent } from '../template-viewer/template-viewer.component';

@Component({
  selector: 'app-template-generator',
  imports: [CommonModule],
  templateUrl: './template-generator.component.html',
  styleUrl: './template-generator.component.css'
})
export class TemplateGeneratorComponent {
  templates = [
    { name: 'Modern', component: TemplateViewerComponent },
    // { name: 'Classic', component: Template2Component }
  ];

  @Output() templateSelected = new EventEmitter<Type<any>>();

  selectTemplate(tpl: any) {
    this.templateSelected.emit(tpl.component);
  }
}
