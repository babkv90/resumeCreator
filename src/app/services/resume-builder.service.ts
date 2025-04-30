import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';

export interface ChatRequest {
  message: string;
  context: any;
}

export interface ChatResponse {
  response: string;
  intent: string;
  entities: any;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeBuilderService {
  private apiUrl = 'http://localhost:8000/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: false  // Set to true if you need to send cookies
  };

  constructor(private http: HttpClient) {
    // Verify API connection on service initialization
    this.checkHealth().subscribe(
      () => console.log('API connection successful'),
      error => console.error('API connection failed:', error)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 0) {
      // Connection error
      errorMessage = 'Unable to connect to the server. Please check if the API is running.';
    } else {
      // Server-side error
      errorMessage = `Server returned code ${error.status}, error: ${error.error?.detail || error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  checkHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`)
      .pipe(
        timeout(5000),  // 5 second timeout
        retry(1),       // Retry failed request once
        catchError(this.handleError)
      );
  }

  chat(message: string, context: any = {}): Observable<ChatResponse> {
    const payload: ChatRequest = { message, context };
    
    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, payload, this.httpOptions)
      .pipe(
        timeout(30000),  // 30 second timeout for LLM responses
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
}