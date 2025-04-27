import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  imagePath: string = 'assets/images/hero.png';
  constructor(private router : Router) {}

  navigateToResumeBuilder(){
    this.router.navigate(['/resume_builder']);
  }

  navigateToBlogs(){
    this.router.navigate(['/blogs']);
  }

  navigateToContacts(){
    this.router.navigate(['/contact']);
  }

  navigateToAbooutMe(){ 
    this.router.navigate(['/about_me']);
  }
 
  navigateToLogin(){  
    this.router.navigate(['/user_registration']);
  }
}
