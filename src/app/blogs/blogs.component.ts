import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  imports: [],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  constructor(private router:Router) {}

  navigateToBlogs(){
    this.router.navigate(['/blogs']);
  }

  navigateToContacts(){
    this.router.navigate(['/contact']);
  }
}
