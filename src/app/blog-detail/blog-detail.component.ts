import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlogService, BlogPost, Comment } from '../services/blog.service';
import { ClickOutsideDirective } from '../shared/click-outside.directive';
import { 
  faCalendar, 
  faUser, 
  faClock, 
  faThumbsUp,
  faComment,
  faShareAlt,
  faArrowLeft,
  faPaperPlane,
  faExternalLink,
  faLink,
  faTimes,faBars,faHome,faBlog,faEnvelope,faInfoCircle,faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, ClickOutsideDirective]
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  blogId: number = 0;
  blog: BlogPost | null = null;
  relatedPosts: BlogPost[] = [];
  commentForm: FormGroup;
  replyForm: FormGroup;
  isSubmitting = false;
  showShareMenu = false;
  activeReplyId: number | null = null;
  showNotification = false;
  notificationMessage = '';
  
  // Font Awesome icons
  faCalendar = faCalendar;
  faUser = faUser;
  faClock = faClock;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faShareAlt = faShareAlt;
  faArrowLeft = faArrowLeft;
  faPaperPlane = faPaperPlane;
  faExternalLink = faExternalLink;
  faLink = faLink;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faTimes = faTimes;
  faBlog=faBlog;faEnvelope=faEnvelope;faInfoCircle=faInfoCircle;faSignInAlt=faSignInAlt;faHome=faHome;faBars=faBars;
  isMenuOpen: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.replyForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogId = parseInt(id, 10);
      this.loadBlogData();
    } else {
      this.router.navigate(['/blogs']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToBlog(): void {
    // this.router.navigate(['/blogs']);
    this.router.navigate(['/blogs', 0])
  }

  private loadBlogData(): void {
    this.blogService.getBlogPost(this.blogId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(blog => {
        if (blog) {
          this.blog = blog;
          this.blogService.incrementViews(this.blogId);
          this.loadRelatedPosts();
        } else {
          this.router.navigate(['/blogs']);
        }
      });
  }

  private loadRelatedPosts(): void {
    if (this.blog) {
      this.blogService.getRelatedPosts(this.blogId, this.blog.tags)
        .pipe(takeUntil(this.destroy$))
        .subscribe(posts => {
          this.relatedPosts = posts;
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/blogs']);
  }

  likePost(): void {
    if (this.blog && !this.blog.isLiked) {
      this.blogService.likeBlogPost(this.blogId);
      this.showNotification = true;
      this.notificationMessage = 'Blog post liked!';
      setTimeout(() => this.showNotification = false, 3000);
    }
  }

  likeComment(comment: Comment): void {
    if (!comment.isLiked && this.blog) {
      this.blogService.likeComment(this.blogId, comment.id);
    }
  }

  submitComment(): void {
    if (this.commentForm.valid) {
      this.isSubmitting = true;
      const { author, content } = this.commentForm.value;
      
      this.blogService.addComment(this.blogId, {
        author,
        content,
        date: new Date().toISOString()
      });

      this.commentForm.reset();
      this.isSubmitting = false;
      this.showNotification = true;
      this.notificationMessage = 'Comment posted successfully!';
      setTimeout(() => this.showNotification = false, 3000);
    }
  }

  submitReply(commentId: number): void {
    if (this.replyForm.valid) {
      this.isSubmitting = true;
      const { author, content } = this.replyForm.value;
      
      this.blogService.addReply(this.blogId, commentId, {
        author,
        content,
        date: new Date().toISOString()
      });

      this.replyForm.reset();
      this.activeReplyId = null;
      this.isSubmitting = false;
      this.showNotification = true;
      this.notificationMessage = 'Reply posted successfully!';
      setTimeout(() => this.showNotification = false, 3000);
    }
  }

  toggleReplyForm(commentId: number): void {
    this.activeReplyId = this.activeReplyId === commentId ? null : commentId;
    this.replyForm.reset();
  }

  sharePost(platform: 'facebook' | 'twitter' | 'linkedin' | 'copy'): void {
    if (!this.blog) return;

    const url = window.location.href;
    const title = this.blog.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          this.showNotification = true;
          this.notificationMessage = 'Link copied to clipboard!';
          setTimeout(() => this.showNotification = false, 3000);
        });
        break;
    }

    this.blogService.incrementShares(this.blogId);
    this.showShareMenu = false;
  }

  toggleShareMenu(): void {
    this.showShareMenu = !this.showShareMenu;
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
