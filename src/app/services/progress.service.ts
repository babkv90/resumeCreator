import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, Subject } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface Step {
  name: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: Date;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: Date;
  category: string;
  tags: string[];
  likes: number;
  liked: boolean;
  readTime: number;
  comments: Comment[];
}

export interface InterviewProgress {
  section: string;
  completed: boolean;
  responses: Record<string, any>;
}

export interface ContentGenerationProgress {
  status: 'not_started' | 'generating' | 'completed' | 'failed';
  currentSection?: string;
  completedSections: string[];
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private blogs: Blog[] = [
    {
      id: '1',
      title: '10 Resume Mistakes That Are Costing You Interviews',
      content: 'Detailed content about resume mistakes...',
      excerpt: 'Avoid these common resume mistakes to increase your interview chances.',
      author: 'Jane Smith',
      date: new Date('2023-05-15'),
      category: 'Resume Tips',
      tags: ['resume', 'mistakes', 'interview'],
      likes: 42,
      liked: false,
      readTime: 5,
      comments: [
        {
          id: 'c1',
          author: 'John Doe',
          content: 'Great article! I made several of these mistakes.',
          date: new Date('2023-05-16')
        }
      ]
    },
    // Add more blog posts...
  ];

  private steps: Step[] = [
    { name: 'Heading', completed: false },
    { name: 'Work History', completed: false },
    { name: 'Education', completed: false },
    { name: 'Skills', completed: false },
    { name: 'Summary', completed: false },
    { name: 'Finalize', completed: false }
  ];

  private currentStepSubject = new BehaviorSubject<number>(0);
  private stepsSubject = new BehaviorSubject<Step[]>(this.steps);
  private progressSubject = new BehaviorSubject<number>(0);

  currentStep$ = this.currentStepSubject.asObservable();
  steps$ = this.stepsSubject.asObservable();
  progress$ = this.progressSubject.asObservable();
  currentFormData = new BehaviorSubject<any>({});
  private interviewProgress = new BehaviorSubject<InterviewProgress>({
    section: '',
    completed: false,
    responses: {}
  });
  private contentProgress = new BehaviorSubject<ContentGenerationProgress>({
    status: 'not_started',
    completedSections: []
  });

  formData$ = this.currentFormData.asObservable();
  interview$ = this.interviewProgress.asObservable();
  contentGeneration$ = this.contentProgress.asObservable();

  constructor() {
    this.updateProgress();
  }

  getSteps(): Step[] {
    return this.steps;
  }

  getCurrentStep(): number {
    return this.currentStepSubject.value;
  }

  setCurrentStep(step: number) {
    this.currentStepSubject.next(step);
  }

  completeStep(stepIndex: number) {
    this.steps[stepIndex].completed = true;
    this.stepsSubject.next([...this.steps]);
    this.currentStepSubject.next(stepIndex + 1);
    this.updateProgress();
  }

  private updateProgress() {
    const completedSteps = this.steps.filter(step => step.completed).length;
    const progress = (completedSteps / this.steps.length) * 100;
    this.progressSubject.next(progress);
  }

  resetProgress() {
    this.steps = this.steps.map(step => ({ ...step, completed: false }));
    this.stepsSubject.next([...this.steps]);
    this.currentStepSubject.next(0);
    this.updateProgress();
    this.currentFormData.next({});
    this.interviewProgress.next({
      section: '',
      completed: false,
      responses: {}
    });
    this.contentProgress.next({
      status: 'not_started',
      completedSections: []
    });
  }

  private componentSelectedSource = new Subject<string>();
  componentSelected$ = this.componentSelectedSource.asObservable();

  selectComponent(component: string) {
    this.componentSelectedSource.next(component);
  }

  async downloadPDF(element: HTMLElement) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    
    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for better quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, width, height, undefined, 'FAST');
    pdf.save('resume.pdf');
  }

  updateFormData(data: any) {
    const currentData = this.currentFormData.value;
    this.currentFormData.next({ ...currentData, ...data });
  }

  updateInterviewProgress(progress: Partial<InterviewProgress>) {
    const current = this.interviewProgress.value;
    this.interviewProgress.next({
      ...current,
      ...progress,
      responses: { ...current.responses, ...(progress.responses || {}) }
    });
  }

  updateContentProgress(progress: Partial<ContentGenerationProgress>) {
    const current = this.contentProgress.value;
    this.contentProgress.next({
      ...current,
      ...progress,
      completedSections: progress.completedSections || current.completedSections
    });
  }

  getOverallProgress(): number {
    const sections = ['personal_info', 'experience', 'education', 'skills', 'summary'];
    const completedSections = this.contentProgress.value.completedSections;
    return Math.round((completedSections.length / sections.length) * 100);
  }

  getCurrentSection(): string {
    return this.interviewProgress.value.section;
  }

  isInterviewComplete(): boolean {
    return this.interviewProgress.value.completed;
  }

  getContentGenerationStatus(): string {
    return this.contentProgress.value.status;
  }

  addError(error: string) {
    const current = this.contentProgress.value;
    const errors = [...(current.errors || []), error];
    this.contentProgress.next({
      ...current,
      errors
    });
  }

  clearErrors() {
    const current = this.contentProgress.value;
    this.contentProgress.next({
      ...current,
      errors: []
    });
  }

  getBlogs() {
    return of([...this.blogs]).pipe(delay(500)); // Simulate API call
  }

  likeBlog(blogId: string) {
    const blog = this.blogs.find(b => b.id === blogId);
    if (blog) {
      blog.liked = !blog.liked;
      blog.likes += blog.liked ? 1 : -1;
    }
    return of(blog);
  }

  addComment(blogId: string, comment: Omit<Comment, 'id' | 'date'>) {
    const blog = this.blogs.find(b => b.id === blogId);
    if (blog) {
      const newComment: Comment = {
        ...comment,
        id: `c${blog.comments.length + 1}`,
        date: new Date()
      };
      blog.comments.push(newComment);
    }
    return of(blog);
  }

  getCategories() {
    const categories = new Set(this.blogs.map(blog => blog.category));
    return Array.from(categories);
  }

  getTags() {
    const allTags = this.blogs.flatMap(blog => blog.tags);
    return Array.from(new Set(allTags));
  }
  
}