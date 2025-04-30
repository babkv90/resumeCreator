import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  fullContent?: string;
  author: string;
  authorImage?: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  views?: number;
  shares?: number;
  comments: Comment[];
  tags: string[];
  readTime: string;
  image?: string;
  excerpt?: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Building the Perfect Resume: A Comprehensive Guide',
      content: `Creating a compelling resume is crucial in today's competitive job market. Here's your comprehensive guide to crafting a resume that stands out and gets you noticed by top employers.

### 1. Start with a Strong Summary
Your professional summary is the first thing recruiters see. Make it count by highlighting your key achievements and career goals.

### 2. Highlight Relevant Experience
Focus on experiences that directly relate to the position you're applying for. Use action verbs and quantify your achievements where possible.

### 3. Skills Section
Organize your skills into categories:
- Technical Skills
- Soft Skills
- Industry-Specific Skills`,
      author: 'John Doe',
      authorImage: 'https://ui-avatars.com/api/?name=John+Doe',
      date: '2024-04-25',
      likes: 245,
      isLiked: false,
      views: 1205,
      shares: 89,
      comments: [],
      tags: ['Resume Tips', 'Career Advice', 'Job Search'],
      readTime: '8 min read',
      image: 'assets/images/resume-guide.jpg'
    },
    {
      id: 2,
      title: '10 Interview Tips That Will Help You Get Hired',
      content: 'Master the art of interviewing with these proven strategies...',
      author: 'Sarah Wilson',
      date: '2024-04-24',
      likes: 189,
      comments: [],
      tags: ['Interview Tips', 'Career Growth', 'Job Search'],
      readTime: '6 min read',
      image: 'assets/images/interview-tips.jpg'
    }
  ];

  private blogPostsSubject = new BehaviorSubject<BlogPost[]>(this.blogPosts);

  constructor() {}

  getBlogPosts(): Observable<BlogPost[]> {
    return this.blogPostsSubject.asObservable();
  }

  getBlogPost(id: number): Observable<BlogPost | undefined> {
    return this.getBlogPosts().pipe(
      map(posts => posts.find(post => post.id === id))
    );
  }

  getRelatedPosts(currentPostId: number, tags: string[]): Observable<BlogPost[]> {
    return this.getBlogPosts().pipe(
      map(posts => posts
        .filter(post => post.id !== currentPostId)
        .filter(post => post.tags.some(tag => tags.includes(tag)))
        .slice(0, 2)
      )
    );
  }

  likeBlogPost(postId: number): void {
    const posts = this.blogPostsSubject.value;
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1 && !posts[postIndex].isLiked) {
      posts[postIndex] = {
        ...posts[postIndex],
        likes: posts[postIndex].likes + 1,
        isLiked: true
      };
      this.blogPostsSubject.next(posts);
    }
  }

  addComment(postId: number, comment: Omit<Comment, 'id' | 'likes' | 'isLiked'>): void {
    const posts = this.blogPostsSubject.value;
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      const newComment: Comment = {
        id: Math.max(0, ...posts[postIndex].comments.map(c => c.id)) + 1,
        ...comment,
        likes: 0,
        isLiked: false
      };

      posts[postIndex] = {
        ...posts[postIndex],
        comments: [newComment, ...posts[postIndex].comments]
      };
      this.blogPostsSubject.next(posts);
    }
  }

  addReply(postId: number, commentId: number, reply: Omit<Comment, 'id' | 'likes' | 'isLiked'>): void {
    const posts = this.blogPostsSubject.value;
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      const commentIndex = posts[postIndex].comments.findIndex(c => c.id === commentId);
      
      if (commentIndex !== -1) {
        const comment = posts[postIndex].comments[commentIndex];
        const replies = comment.replies || [];
        
        const newReply: Comment = {
          id: Math.max(0, ...replies.map(r => r.id)) + 1,
          ...reply,
          likes: 0,
          isLiked: false
        };

        posts[postIndex].comments[commentIndex] = {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };

        this.blogPostsSubject.next(posts);
      }
    }
  }

  likeComment(postId: number, commentId: number): void {
    const posts = this.blogPostsSubject.value;
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      const commentIndex = posts[postIndex].comments.findIndex(c => c.id === commentId);
      
      if (commentIndex !== -1 && !posts[postIndex].comments[commentIndex].isLiked) {
        posts[postIndex].comments[commentIndex] = {
          ...posts[postIndex].comments[commentIndex],
          likes: posts[postIndex].comments[commentIndex].likes + 1,
          isLiked: true
        };
        this.blogPostsSubject.next(posts);
      }
    }
  }

  incrementViews(postId: number): void {
    const posts = this.blogPostsSubject.value;
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      posts[postIndex] = {
        ...posts[postIndex],
        views: (posts[postIndex].views || 0) + 1
      };
      this.blogPostsSubject.next(posts);
    }
  }

  incrementShares(postId: number): void {
    const posts = this.blogPostsSubject.value;
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      posts[postIndex] = {
        ...posts[postIndex],
        shares: (posts[postIndex].shares || 0) + 1
      };
      this.blogPostsSubject.next(posts);
    }
  }
}