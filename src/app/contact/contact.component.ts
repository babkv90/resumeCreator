import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private router:Router) {}
  navigateToBlogs(){
    this.router.navigate(['/blogs']);
  }

  navigateToContacts(){
    this.router.navigate(['/contact']);
  }
}
