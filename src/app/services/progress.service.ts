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
  }

  private componentSelectedSource = new Subject<string>();
  componentSelected$ = this.componentSelectedSource.asObservable();

  selectComponent(component: string) {
    this.componentSelectedSource.next(component);
  }

  // async downloadPDF(elementId: string, fileName: string = 'resume.pdf'): Promise<void> {
  //   try {
  //     // Get the HTML element to convert
  //     const element = document.getElementById(elementId);
  //     if (!element) {
  //       console.error('Element not found');
  //       return;
  //     }

  //     // Use html2canvas to capture the element
  //     const canvas = await html2canvas(element, {
  //       scale: 2, // Higher quality
  //       logging: false,
  //       useCORS: true,
  //       allowTaint: true,
  //       scrollX: 0,
  //       scrollY: 0,
  //       windowWidth: element.scrollWidth,
  //       windowHeight: element.scrollHeight
  //     });

  //     // Create PDF
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const imgData = canvas.toDataURL('image/png');
  //     const imgWidth = 210; // A4 width in mm
  //     const pageHeight = 295; // A4 height in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     pdf.save(fileName);

  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     throw error; // Re-throw if you want to handle in component
  //   }
  // }


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

  private formData = new BehaviorSubject<any>({});
  currentFormData = this.formData.asObservable();

  updateFormData(data: any) {
    this.formData.next(data);
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