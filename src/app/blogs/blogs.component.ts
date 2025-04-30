import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlogService, BlogPost } from '../services/blog.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { 
  faSearch,
  faThumbsUp,
  faComment,
  faFilter,
  faSortAmountDown,
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
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class BlogsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  blogPosts: BlogPost[] = [];
  searchTerm: string = '';
  selectedTag: string | null = null;
  availableTags: Set<string> = new Set();
  
  // Font Awesome icons
  faSearch = faSearch;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faFilter = faFilter;
  faSortAmountDown = faSortAmountDown;
  faFileAlt = faFileAlt; 
  faArrowRight = faArrowRight;
  faBars = faBars;
  faTimes = faTimes;
  faHome = faHome;
  faBlog = faBlog;
  faEnvelope  = faEnvelope;
  faInfoCircle = faInfoCircle;  
  faSignInAlt = faSignInAlt;
  isMenuOpen: any;

  constructor(
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadBlogPosts(): void {
    this.blogService.getBlogPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(posts => {
        this.blogPosts = posts;
        this.updateAvailableTags();
      });
  }

  private updateAvailableTags(): void {
    this.availableTags = new Set(
      this.blogPosts.flatMap(post => post.tags)
    );
  }

  navigateToBlogDetail(postId: number): void {
    this.router.navigate(['/blog', postId]);
  }

  filterByTag(tag: string | null): void {
    this.selectedTag = tag;
  }

  get filteredPosts(): BlogPost[] {
    return this.blogPosts
      .filter(post => 
        !this.searchTerm || 
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter(post => 
        !this.selectedTag || 
        post.tags.includes(this.selectedTag)
      );
  }

  likePost(post: BlogPost, event: Event): void {
    event.stopPropagation();
    if (!post.isLiked) {
      this.blogService.likeBlogPost(post.id);
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
