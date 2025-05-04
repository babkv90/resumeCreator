import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ChatRequest {
  message: string;
  context: any;
}

export interface ChatResponse {
  response: string;
  intent: string;
  entities: any;
}

export interface ConversationResponse {
  session_id?: string;
  status: 'in_progress' | 'complete' | 'error';
  message?: string;
  question?: string;
  field_id?: string;
  progress?: {
    current: number;
    total: number;
  };
  resume_data?: any;
  collected_data?: any;
  conversation_history?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  current_question?: string;
  suggestions?: string[];
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeBuilderService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: true
  };

  private currentSession: string | null = null;

  constructor(private http: HttpClient) {
    this.checkHealth().subscribe(
      () => console.log('API connection successful'),
      error => console.error('API connection failed:', error)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 0) {
      errorMessage = 'Unable to connect to the server. Please check if the API is running.';
    } else {
      errorMessage = `Server returned code ${error.status}, error: ${error.error?.detail || error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  checkHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`)
      .pipe(
        timeout(5000),
        retry(1),
        catchError(this.handleError)
      );
  }

  startConversation(): Observable<ConversationResponse> {
    return this.http.post<ConversationResponse>(`${this.apiUrl}/conversation/start`, {}, this.httpOptions)
      .pipe(
        tap(response => {
          if (response.session_id) {
            this.currentSession = response.session_id;
            console.log('Started new conversation session:', response.session_id);
          }
        }),
        timeout(10000),
        retry(1),
        catchError(this.handleError)
      );
  }

  continueConversation(sessionId: string, response: string): Observable<ConversationResponse> {
    if (!sessionId) {
      console.error('No session ID provided');
      return throwError(() => new Error('No session ID provided'));
    }

    return this.http.post<ConversationResponse>(
      `${this.apiUrl}/conversation/${sessionId}`,
      { response },
      this.httpOptions
    ).pipe(
      timeout(30000),
      retry(1),
      catchError(this.handleError)
    );
  }

  chat(message: any): Observable<ChatResponse> {
    if (!this.currentSession) {
      console.error('No active session. Call startConversation first.');
      return throwError(() => new Error('No active session'));
    }

    const payload = { response: message.response };
    return this.http.post<ChatResponse>(`${this.apiUrl}/conversation/${message.session_id}`, payload, this.httpOptions)
      .pipe(
        timeout(30000),
        retry(1),
        catchError(this.handleError)
      );
  }

  getTemplates(preferences: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/templates`, { preferences }, this.httpOptions)
      .pipe(
        timeout(10000),
        retry(1),
        catchError(this.handleError)
      );
  }

  generateSection(sectionType: string, context: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-section`, {
      section_type: sectionType,
      context
    }, this.httpOptions)
      .pipe(
        timeout(30000),
        retry(1),
        catchError(this.handleError)
      );
  }

  validateResume(resumeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate`, { resume_data: resumeData }, this.httpOptions)
      .pipe(
        timeout(30000),
        retry(1),
        catchError(this.handleError)
      );
  }

  getCurrentSession(): string | null {
    return this.currentSession;
  }
}