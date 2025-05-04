import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ResumeData } from '../shared/models/resume.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeAgentService {
  private readonly apiUrl = environment.apiUrl;
  private resumeDataSubject = new BehaviorSubject<ResumeData | null>(null);
  public resumeData$ = this.resumeDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  generateResume(userResponses: any): Observable<ResumeData> {
    return this.http.post<any>(`${this.apiUrl}generate-resume`, { user_inputs: userResponses })
      .pipe(
        map(response => {
          if (response.status === 'success' && response.resume_content) {
            return this.formatResumeData(response.resume_content);
          } else {
            throw new Error(response.error || 'Failed to generate resume');
          }
        }),
        tap(formattedData => {
          this.resumeDataSubject.next(formattedData);
        })
      );
  }

  getSuggestedTemplate(resumeContent: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/templates/suggest`, { content: resumeContent });
  }

  private formatResumeData(content: any): ResumeData {
    return {
      personalInfo: {
        name: content.personal?.name || '',
        email: content.personal?.email || '',
        phone: content.personal?.phone || '',
        address: content.personal?.address || '',
        linkedIn: content.personal?.linkedIn || '',
        portfolio: content.personal?.portfolio || ''
      },
      summary: content.summary || '',
      skills: content.skills?.technical || [],
      education: (content.education || []).map((edu: any) => ({
        degree: edu.degree || '',
        institution: edu.institution || '',
        year: edu.year || ''
      })),
      experience: (content.experience || []).map((exp: any) => ({
        position: exp.title || '',
        company: exp.company || '',
        duration: exp.duration || '',
        points: exp.achievements || []
      })),
      template: content.template || 'modern'
    };
  }
}