import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { 
  faFileAlt, 
  faArrowRight, 
  faBars, 
  faTimes,
  faHome,
  faBlog,
  faEnvelope,
  faInfoCircle,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  imagePath: string = 'assets/images/hero.png';
  faGithub = faGithub;
  faFileAlt = faFileAlt;
  faArrowRight = faArrowRight;
  faBars = faBars;
  faTimes = faTimes;
  faHome = faHome;
  faBlog = faBlog;
  faEnvelope = faEnvelope;
  faInfoCircle = faInfoCircle;
  faSignInAlt = faSignInAlt;
  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToResumeBuilder() {
    this.router.navigate(['/resume_builder']);
  }

  navigateToBlogs() {
    this.router.navigate(['/blogs']);
  }

  navigateToContacts() {
    this.router.navigate(['/contact']);
  }

  navigateToAbooutMe() { 
    this.router.navigate(['/about_me']);
  }
 
  navigateToLogin() {  
    this.router.navigate(['/user_registration']);
  }
}
