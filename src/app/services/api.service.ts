import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserInputs {
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
    achievements: string[];
  }[];
  job_target: string;
}

export interface ResumeResponse {
  resume_content: {
    content: string;
    sections: {
      summary: string;
      experience: string[];
      skills: {
        technical: string[];
        soft: string[];
        domain: string[];
      };
      education: string[];
    };
    metadata: {
      atsScore: number;
      timestamp: string;
    };
  };
  suggested_templates: string[];
  session_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private currentSessionSubject = new BehaviorSubject<string | null>(null);
  currentSession$ = this.currentSessionSubject.asObservable();

  constructor(private http: HttpClient) {}

  generateResume(userInputs: UserInputs, templatePreferences?: string[]): Observable<ResumeResponse> {
    return this.http.post<ResumeResponse>(`${this.apiUrl}/resume/generate`, {
      user_inputs: userInputs,
      template_preferences: templatePreferences
    }).pipe(
      catchError(this.handleError)
    );
  }

  getResumeBySession(sessionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/resume/${sessionId}`).pipe(
      catchError(this.handleError)
    );
  }

  getTemplate(templateId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/templates/${templateId}`).pipe(
      catchError(this.handleError)
    );
  }

  getTemplatesByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/templates/category/${category}`).pipe(
      catchError(this.handleError)
    );
  }

  getPopularTemplates(): Observable<any> {
    return this.http.get(`${this.apiUrl}/templates/list/popular`).pipe(
      catchError(this.handleError)
    );
  }

  updateTemplateUsage(templateId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/templates/${templateId}/used`, {}).pipe(
      catchError(this.handleError)
    );
  }

  setCurrentSession(sessionId: string) {
    this.currentSessionSubject.next(sessionId);
    localStorage.setItem('currentResumeSession', sessionId);
  }

  getCurrentSession(): string | null {
    return localStorage.getItem('currentResumeSession');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}`;
    }
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}