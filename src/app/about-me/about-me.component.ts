import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  icon?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  imageMobile: string;
  link: string;
  github: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  logo?: string;
}

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AboutMeComponent implements OnInit {
  isMenuOpen = false;
  prefersReducedMotion = false;

  skills: Skill[] = [
    { name: 'Angular', level: 90, category: 'frontend', icon: 'angular' },
    { name: 'React', level: 85, category: 'frontend', icon: 'react' },
    { name: 'TypeScript', level: 88, category: 'frontend', icon: 'typescript' },
    { name: 'Node.js', level: 85, category: 'backend', icon: 'nodejs' },
    { name: 'Express.js', level: 82, category: 'backend', icon: 'express' },
    { name: 'MongoDB', level: 80, category: 'database', icon: 'mongodb' },
    { name: 'MySQL', level: 75, category: 'database', icon: 'mysql' },
    { name: 'Git', level: 85, category: 'tools', icon: 'git' },
    { name: 'Docker', level: 70, category: 'tools', icon: 'docker' },
    { name: 'AWS', level: 65, category: 'tools', icon: 'aws' }
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with real-time inventory management, payment integration, and admin dashboard.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      imageMobile: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Task Management System',
      description: 'A collaborative task management system with real-time updates, team collaboration, and progress tracking.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      imageMobile: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing projects, skills, and experience with a modern design.',
      technologies: ['Angular', 'Tailwind CSS', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      imageMobile: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '#',
      github: '#'
    }
  ];

  experiences: Experience[] = [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior MEAN Stack Developer',
      duration: '2021 - Present',
      description: [
        'Led development of enterprise-level applications using MEAN stack',
        'Implemented CI/CD pipelines and automated testing',
        'Mentored junior developers and conducted code reviews',
        'Optimized application performance and reduced load times by 40%'
      ],
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Express', 'Docker'],
      logo: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=random'
    },
    {
      company: 'Digital Innovations',
      position: 'Full Stack Developer',
      duration: '2019 - 2021',
      description: [
        'Developed and maintained multiple web applications',
        'Collaborated with UX designers to implement responsive designs',
        'Integrated third-party APIs and services',
        'Implemented security best practices and data encryption'
      ],
      technologies: ['React', 'Node.js', 'MySQL', 'AWS'],
      logo: 'https://ui-avatars.com/api/?name=Digital+Innovations&background=random'
    }
  ];

  constructor(private router: Router) {
    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  ngOnInit(): void {
    // Add event listener for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToBlogs(): void {
    this.router.navigate(['/blogs']);
  }

  navigateToContacts(): void {
    this.router.navigate(['/contacts']);
  }

  navigateToAbooutMe(): void {
    this.router.navigate(['/about-me']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getAnimationClass(): string {
    return this.prefersReducedMotion ? '' : 'transition-all duration-300';
  }
}
