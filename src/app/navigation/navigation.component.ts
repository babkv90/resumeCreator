import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavigationComponent {
  @Input() currentSection: string = '';

  sections = [
    { id: 'heading', name: 'Heading', route: '/resume-dashboard' },
    { id: 'work-history', name: 'Work History', route: '/work-history' },
    { id: 'education-level', name: 'Education', route: '/education-level' },
    { id: 'skills', name: 'Skills', route: '/skills' },
    { id: 'summary', name: 'Summary', route: '/summary' },
    { id: 'finalize', name: 'Finalize', route: '/finalize' }
  ];

  constructor(private router: Router) {}

  navigateTo(section: string): void {
    const targetSection = this.sections.find(s => s.id === section);
    if (targetSection) {
      this.router.navigate([targetSection.route]);
    }
  }

  isCurrentSection(sectionId: string): boolean {
    return this.currentSection === sectionId;
  }
} 