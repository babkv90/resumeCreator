import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faBars,
  faTimes,
  faHome,
  faInfoCircle,
  faSignInAlt,
  faBlog
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // Font Awesome icons
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faBars = faBars;
  faTimes = faTimes;
  faHome = faHome;
  faBlog= faBlog;
  faInfoCircle = faInfoCircle;
  faSignInAlt = faSignInAlt;
  isMenuOpen = false;
  contactForm: FormGroup;

  submitted = false;
  submitSuccess = false;


  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      // Here you would typically send the form data to your backend
      console.log(this.contactForm.value);
      this.submitSuccess = true;
      this.contactForm.reset();
      this.submitted = false;
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 3000);
    }
  }

  // Getter methods for easy form field validation
  get f() {
    return this.contactForm.controls;
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
