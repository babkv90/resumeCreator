import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faJs, 
  faAngular, 
  faHtml5, 
  faCss3Alt, 
  faNodeJs, 
  faReact, 
  faGithub, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faServer,
  faTools,
  faCloud,
  faHome,
  faTimes,
  faBars,
  faEnvelope,
  faInfoCircle,
  faSignInAlt,
  faBlog
} from '@fortawesome/free-solid-svg-icons';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: any;
  animated?: boolean;
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
  imports: [CommonModule, FontAwesomeModule]
})
export class AboutMeComponent implements OnInit {
  isMenuOpen = false;
  prefersReducedMotion = false;

  // Font Awesome icons
  faJs = faJs;
  faAngular = faAngular;
  faHtml5 = faHtml5;
  faCss3Alt = faCss3Alt;
  faNodeJs = faNodeJs;
  faReact = faReact;
  faDatabase = faDatabase;
  faServer = faServer;
  faTools = faTools;
  faCloud = faCloud;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faHome = faHome;
  faTimes = faTimes;
  faBars = faBars;
  faBlog = faBlog;
  faEnvelope = faEnvelope;
  faInfoCircle = faInfoCircle;
  faSignInAlt = faSignInAlt;

  portfolio: any = {
    projects: [{
      image: "string",
      imageMobile: "string",  
      title: "string",
      github: "string",
      name: "string",
      description: "string",                
    }]
  };

  skills: Skill[] = [
    { name: 'JavaScript', level: 90, category: 'frontend', icon: this.faJs },
    { name: 'Angular', level: 85, category: 'frontend', icon: this.faAngular },
    { name: 'HTML5', level: 95, category: 'frontend', icon: this.faHtml5 },
    { name: 'CSS3', level: 88, category: 'frontend', icon: this.faCss3Alt },
    { name: 'React', level: 85, category: 'frontend', icon: this.faReact },
    { name: 'Node.js', level: 85, category: 'backend', icon: this.faNodeJs },
    { name: 'Express.js', level: 82, category: 'backend', icon: this.faServer },
    { name: 'MongoDB', level: 80, category: 'database', icon: this.faDatabase },
    { name: 'MySQL', level: 75, category: 'database', icon: this.faDatabase },
    { name: 'Git', level: 85, category: 'tools', icon: this.faTools },
    { name: 'Docker', level: 70, category: 'tools', icon: this.faTools },
    { name: 'AWS', level: 65, category: 'tools', icon: this.faCloud }
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
      company: 'Tech Solutions',
      position: 'Senior Software Engineer',
      duration: '2023 - Present',
      description: [
        'Led frontend development team',
        'Implemented microservices architecture'
      ],
      technologies: ['Angular', 'Node.js', 'Docker'],
      logo: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=random&size=40'
    },
    {
      company: 'Digital Innovations',
      position: 'Full Stack Developer',
      duration: '2021 - 2023',
      description: [
        'Developed scalable web applications',
        'Improved system performance'
      ],
      technologies: ['React', 'Node.js', 'MySQL', 'AWS'],
      logo: 'https://ui-avatars.com/api/?name=Digital+Innovations&background=random&size=40'
    }
  ];

  constructor(private router: Router) {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  ngOnInit(): void {
    this.initializeAnimations();
    this.loadPortfolioData();
  }

  private initializeAnimations(): void {
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });

    if (!this.prefersReducedMotion) {
      this.skills.forEach((skill, index) => {
        setTimeout(() => {
          skill.animated = true;
        }, index * 100);
      });
    }
  }

  private loadPortfolioData(): void {
    if (!this.portfolio.name) {
      this.portfolio = {
        name: 'John Doe',
        title: 'Frontend Developer',
        projects: []
      };
    }
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

  navigateToAboutMe(): void {
    this.router.navigate(['/about-me']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/user_registration']);
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getAnimationClass(): string {
    return this.prefersReducedMotion ? '' : 'transition-all duration-300';
  }
}
