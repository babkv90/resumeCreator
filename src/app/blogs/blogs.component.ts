import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  replies: Comment[];
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  fullContent: string;
  author: string;
  date: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  readTime: string;
}

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BlogsComponent implements OnInit {
  showComments: { [key: number]: boolean } = {};
  likes: { [key: number]: number } = {
    1: 245,
    2: 189
  };

  newComment: { [key: number]: string } = {};
  showReplyForm: { [key: number]: boolean } = {};
  replyToComment: { [key: number]: number | null } = {};
  showBlogDetail: boolean = false;
  selectedBlog: BlogPost | null = null;

  blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Getting Started with Web Development',
      content: 'Learn the fundamentals of web development and start your journey as a developer...',
      fullContent: `Web development is an exciting field that combines creativity with technical skills. In this comprehensive guide, we'll explore the fundamental concepts that every aspiring web developer should know.

1. HTML - The Structure
HTML (HyperText Markup Language) is the backbone of every website. It provides the structure and content of web pages. Learn about:
- Basic HTML elements
- Semantic HTML
- Forms and input types
- Accessibility best practices

2. CSS - The Style
CSS (Cascading Style Sheets) brings your HTML to life with colors, layouts, and animations. Key topics include:
- Selectors and specificity
- Box model
- Flexbox and Grid
- Responsive design
- CSS variables

3. JavaScript - The Behavior
JavaScript adds interactivity to your websites. Essential concepts:
- Variables and data types
- Functions and scope
- DOM manipulation
- Event handling
- Async programming

4. Development Tools
Modern web development requires various tools:
- Code editors (VS Code, Sublime Text)
- Version control (Git)
- Browser developer tools
- Package managers (npm)

5. Best Practices
- Clean code principles
- Performance optimization
- Security considerations
- Cross-browser compatibility

Remember, web development is a journey. Start with the basics, practice regularly, and build projects to apply your knowledge.`,
      author: 'John Doe',
      date: 'March 15, 2024',
      likes: 245,
      comments: [
        {
          id: 1,
          author: 'Jane Smith',
          content: 'Great article! This really helped me understand the basics.',
          likes: 5,
          replies: []
        }
      ],
      tags: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
      readTime: '10 min read'
    },
    {
      id: 2,
      title: 'The Future of AI in Software Development',
      content: 'Exploring how artificial intelligence is transforming the way we write and maintain code...',
      fullContent: `Artificial Intelligence is revolutionizing the software development landscape. Let's dive deep into how AI is changing the way we write, test, and maintain code.

1. AI-Powered Code Generation
- GitHub Copilot and similar tools
- Code completion and suggestions
- Automated code generation
- Impact on developer productivity

2. Automated Testing
- AI-driven test case generation
- Automated bug detection
- Performance testing
- Security vulnerability scanning

3. Code Review and Quality
- Automated code review
- Code quality analysis
- Best practices enforcement
- Technical debt identification

4. Development Workflow
- CI/CD pipeline optimization
- Deployment automation
- Resource allocation
- Project management

5. Future Implications
- Changing role of developers
- New development methodologies
- Ethical considerations
- Industry trends

The integration of AI in software development is not just a trend but a fundamental shift in how we approach programming.`,
      author: 'Sarah Wilson',
      date: 'March 14, 2024',
      likes: 189,
      comments: [
        {
          id: 1,
          author: 'Mike Johnson',
          content: 'Interesting perspective on AI\'s role in development. Looking forward to more content!',
          likes: 3,
          replies: []
        }
      ],
      tags: ['AI', 'Software Development', 'Future Tech', 'Programming'],
      readTime: '8 min read'
    }
  ];

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  
  toggleComments(blogId: number): void {
    this.showComments[blogId] = !this.showComments[blogId];
  }

  toggleLike(blogId: number): void {
    this.likes[blogId] = this.likes[blogId] + 1;
  }

  addComment(blogId: number): void {
    if (this.newComment[blogId]?.trim()) {
      const blog = this.blogPosts.find(post => post.id === blogId);
      if (blog) {
        const newComment: Comment = {
          id: blog.comments.length + 1,
          author: 'Current User',
          content: this.newComment[blogId],
          likes: 0,
          replies: []
        };
        blog.comments.push(newComment);
        this.newComment[blogId] = '';
      }
    }
  }

  addReply(blogId: number, commentId: number): void {
    if (this.newComment[blogId]?.trim()) {
      const blog = this.blogPosts.find(post => post.id === blogId);
      if (blog) {
        const comment = blog.comments.find(c => c.id === commentId);
        if (comment) {
          const newReply: Comment = {
            id: comment.replies.length + 1,
            author: 'Current User',
            content: this.newComment[blogId],
            likes: 0,
            replies: []
          };
          comment.replies.push(newReply);
          this.newComment[blogId] = '';
          this.showReplyForm[commentId] = false;
          this.replyToComment[blogId] = null;
        }
      }
    }
  }

  toggleReplyForm(blogId: number, commentId: number): void {
    this.showReplyForm[commentId] = !this.showReplyForm[commentId];
    this.replyToComment[blogId] = this.showReplyForm[commentId] ? commentId : null;
  }

  likeComment(blogId: number, commentId: number): void {
    const blog = this.blogPosts.find(post => post.id === blogId);
    if (blog) {
      const comment = blog.comments.find(c => c.id === commentId);
      if (comment) {
        comment.likes++;
      }
    }
  }

  showBlogDetailView(blog: BlogPost): void {
    this.selectedBlog = blog;
    this.showBlogDetail = true;
    document.body.style.overflow = 'hidden';
  }

  closeBlogDetailView(): void {
    this.showBlogDetail = false;
    this.selectedBlog = null;
    document.body.style.overflow = 'auto';
  }

  getSelectedBlogId(): number {
    return this.selectedBlog?.id || 0;
  }

  getSelectedBlogComments(): Comment[] {
    return this.selectedBlog?.comments || [];
  }

  getSelectedBlogTags(): string[] {
    return this.selectedBlog?.tags || [];
  }

  getSelectedBlogAuthor(): string {
    return this.selectedBlog?.author || '';
  }

  getSelectedBlogDate(): string {
    return this.selectedBlog?.date || '';
  }

  getSelectedBlogTitle(): string {
    return this.selectedBlog?.title || '';
  }

  getSelectedBlogContent(): string {
    return this.selectedBlog?.fullContent || '';
  }

  getSelectedBlogLikes(): number {
    return this.selectedBlog?.likes || 0;
  }

  getSelectedBlogReadTime(): string {
    return this.selectedBlog?.readTime || '';
  }

  getFormattedContent(): SafeHtml {
    if (!this.selectedBlog) return '';
    const formattedContent = this.selectedBlog.fullContent
      .split('\n')
      .map(line => `<p>${line}</p>`)
      .join('');
    return this.sanitizer.bypassSecurityTrustHtml(formattedContent);
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
