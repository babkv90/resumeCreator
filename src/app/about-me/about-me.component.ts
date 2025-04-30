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
  faBlog,
  faGraduationCap,
  faProjectDiagram,
  faBuilding,
  faUser,
  faLink
} from '@fortawesome/free-solid-svg-icons';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: any;
  animated?: boolean;
}

interface BasicProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  imageMobile: string;
  link: string;
  github: string;
}

interface DetailedProject {
  projectName: string;
  companyName: string;
  clientName: string;
  duration: string;
  description: string[];
  url?: string;
  technologies: string[];
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
  faGraduationCap = faGraduationCap;
  faProjectDiagram = faProjectDiagram;
  faBuilding = faBuilding;
  faUser = faUser;
  faLink = faLink;

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

  projects: BasicProject[] = [
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

  detailedProjects: DetailedProject[] = [
    {
      projectName: 'E-Commerce Platform Redesign',
      companyName: 'Tech Solutions Inc.',
      clientName: 'Fashion Retail Co.',
      duration: 'Jan 2024 - Present',
      description: [
        'Led the complete redesign of client\'s e-commerce platform serving 100k+ monthly users',
        'Implemented responsive design principles resulting in 40% increase in mobile conversions',
        'Integrated payment gateway systems and inventory management solutions',
        'Developed custom analytics dashboard for real-time sales tracking'
      ],
      url: 'https://fashion-retail-example.com',
      technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB']
    },
    {
      projectName: 'Healthcare Management System',
      companyName: 'MedTech Solutions',
      clientName: 'City General Hospital',
      duration: 'Jun 2023 - Dec 2023',
      description: [
        'Developed a comprehensive patient management system',
        'Implemented secure authentication and role-based access control',
        'Created automated appointment scheduling system',
        'Integrated with existing hospital database systems'
      ],
      url: 'https://hospital-demo.example.com',
      technologies: ['Angular', 'RxJS', 'NgRx', 'Express.js', 'PostgreSQL']
    }
  ];

  experiences: Experience[] = [
    {
      company: 'Genpact India Pvt. Ltd.',
      position: 'Lead Consultant',

      duration: 'September 2022 - Present',
      description: [
        'Led frontend development team',
        'Implemented microservices architecture'
      ],
      technologies: ['Angular', 'Node.js', 'MySql' , 'AWS'],
      logo: '/assets/company_logo/genpact-logo.png'
    },
    {
      company: 'Religare Broking Ltd.',
      position: 'Senior Software Engineer',
      duration: 'August 2021 - September 2022',
      description: [
        'Developed scalable web applications',
        'Improved system performance'
      ],
      technologies: ['React', 'Node.js', 'MySQL', 'AWS'],
      logo: '/assets/company_logo/religare-broking.png'
    },
    {
      company: 'Adnate IT Solutions Pvt. Ltd.',
      position: 'Consultant',
      duration: 'August 2017 - August 2021',
      description: [
        'Developed scalable web applications',
        'Improved system performance'
      ],
      technologies: ['React', 'Node.js', 'MySQL', 'AWS'],
      logo: '/assets/company_logo/adnate-it.jpg'
    }
  ];

  
  Education=[{
    name: 'Shankara Institute of Technology',
    university : 'Rajasthan Technical University',
    Year : '2010-2014',
    specialization : 'B.Tech in Electronics and Communication Engineering',
   
}]

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
        name: 'Abinash Kumar',
        title: 'FullStack Developer',
        description: 'A seasoned MEAN stack developer with 8+ years of experience building scalable applications across finance, insurance, and real-time vehicle tracking domains. Proficient in end-to-end development—from architecting robust backends with Node.js & MongoDB to crafting dynamic UIs with Angular. Passionate about cloud-native deployment (AWS Lambda, EC2, and more) and now diving into Agentic AI & LLMs to build next-gen intelligent systems. Always learning, always building.',
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
