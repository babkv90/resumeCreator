import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { TemplateViewerComponent } from '../template-viewer/template-viewer.component';
import { ResumeAgentService } from '../services/resume-agent.service';

export interface Template {
  id: string;
  name: string;
  component: Type<any>;
  suitableFor: string[];
  description: string;
  confidence?: number;
}

@Component({
  selector: 'app-template-generator',
  imports: [CommonModule],
  templateUrl: './template-generator.component.html',
  styleUrl: './template-generator.component.css',
  standalone: true
})
export class TemplateGeneratorComponent implements OnInit {
  @Input() userIndustry: string = '';
  @Output() templateSelected = new EventEmitter<Template>();

  templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern Professional',
      component: TemplateViewerComponent,
      suitableFor: ['technology', 'design', 'marketing', 'startup'],
      description: 'Clean and contemporary design with emphasis on skills and achievements'
    },
    {
      id: 'classic',
      name: 'Classic Traditional',
      component: TemplateViewerComponent,
      suitableFor: ['finance', 'legal', 'education', 'healthcare'],
      description: 'Traditional format focusing on experience and credentials'
    },
    {
      id: 'creative',
      name: 'Creative Portfolio',
      component: TemplateViewerComponent,
      suitableFor: ['design', 'art', 'media', 'entertainment'],
      description: 'Visually striking design for creative professionals'
    }
  ];

  suggestedTemplates: Template[] = [];
  isLoading = false;

  constructor(private resumeAgent: ResumeAgentService) {}

  ngOnInit() {
    this.resumeAgent.resumeData$.subscribe(data => {
      if (data) {
        this.getSuggestionsForContent(data);
      }
    });
  }

  selectTemplate(template: Template) {
    this.templateSelected.emit(template);
  }

  getOtherTemplates(): Template[] {
    return this.templates.filter(template => 
      !this.suggestedTemplates.some(suggested => suggested.id === template.id)
    );
  }

  private getSuggestionsForContent(content: any) {
    this.isLoading = true;
    this.resumeAgent.getSuggestedTemplate(content).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          // Map suggested templates to actual template objects
          this.suggestedTemplates = response.templates
            .map((templateId: string) => {
              const template = this.templates.find(t => t.id === templateId);
              if (template) {
                return {
                  ...template,
                  confidence: response.confidence
                };
              }
              return null;
            })
            .filter((t: Template | null): t is Template => t !== null);

          // If we have suggestions, automatically select the first one
          if (this.suggestedTemplates.length > 0) {
            this.selectTemplate(this.suggestedTemplates[0]);
          }
        }
      },
      error: (error) => {
        console.error('Error getting template suggestions:', error);
        // Fallback to filtering by industry
        this.suggestedTemplates = this.filterByIndustry();
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private filterByIndustry(): Template[] {
    if (!this.userIndustry) return this.templates;
    return this.templates.filter(template => 
      template.suitableFor.some(industry => 
        industry.toLowerCase().includes(this.userIndustry.toLowerCase())
      )
    );
  }
}
