import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressService } from '../services/progress.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faGlobe, 
  faLink,
  faChevronRight,
  faTimes,
  faBars,
  faSun,
  faMoon,
  faComment,
  faPaperclip,
  faMicrophone,
  faPaperPlane,
  faSpinner,
  faSearch,
  faCode,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin, 
  faGithub, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { MarkdownModule } from 'ngx-markdown';
import { ResumeBuilderService, ConversationResponse } from '../services/resume-builder.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { catchError, take, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'system';  // Added system as a sender type
  timestamp: Date;
  isTyping?: boolean;
  state?: 'thinking' | 'researching' | 'calling_api' | 'generating' | null;
  suggestions?: string[];
}

interface QuickAction {
  id: string;
  label: string;
  action: () => void;
}

interface AgentResponse {
  message: string;
  suggestions?: string[];
  nextQuestion?: string;
  section?: string;
  completed?: boolean;
}

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, MarkdownModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add this line to support FontAwesome properties
})
export class PersonalInfoComponent implements OnInit, AfterViewChecked {
  messagess: Array<{text: string, isUser: boolean}> = [];
  userInput = '';
  context: any = {};
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  personalInfoForm: FormGroup;
  cities: string[] = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
  ];
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'
  ];
  zipCodes: string[] = [
    '10001', '90001', '60601', '77001', '85001',
    '19101', '78201', '92101', '75201', '95101'
  ];

  filteredCities: string[] = [];
  filteredStates: string[] = [];
  filteredZipCodes: string[] = [];

  // Dropdown visibility states
  showCityDropdown = false;
  showStateDropdown = false;
  showZipCodeDropdown = false;

  // Font Awesome icons
  faUser = faUser;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faGlobe = faGlobe;
  faLink = faLink;
  faChevronRight = faChevronRight;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faTwitter = faTwitter;
  faTimes = faTimes;
  faBars = faBars;
  faSun = faSun;
  faMoon = faMoon;
  faComment = faComment;
  faPaperclip = faPaperclip;
  faMicrophone = faMicrophone;
  faPaperPlane = faPaperPlane;
  faSpinner = faSpinner;

  // Chat state
  showSidebar = false;
  isDarkMode = false;
  isProcessing = false;
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  messages: any = [];
  messageForm: FormGroup;

  quickActions: QuickAction[] = [
    { 
      id: 'summarize',
      label: 'Summarize',
      action: () => this.summarizeConversation()
    },
    {
      id: 'sources',
      label: 'Ask for Sources',
      action: () => this.requestSources()
    },
    {
      id: 'explain',
      label: 'Explain More',
      action: () => this.requestExplanation()
    }
  ];

  currentMessage: string = '';
  isLoading = false;
  currentSection = '';
  interviewCompleted = false;
  suggestions: string[] = [];
  session_id: string | undefined;

  constructor(private fb: FormBuilder, private progressService: ProgressService,private resumeBuilder: ResumeBuilderService, private http: HttpClient, public authService: AuthService) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      linkedIn: [''],
      portfolio: [''],
      objective: [''],
      userInput: ['', Validators.required]
    });

    this.messageForm = this.fb.group({
      message: ['', Validators.required]
    });

    // Initialize filtered lists
    this.filteredCities = this.cities;
    this.filteredStates = this.states;
    this.filteredZipCodes = this.zipCodes;

    // Initialize with some sample conversations
    this.conversations = [
      {
        id: '1',
        title: 'Personal Information',
        lastMessage: 'Let me help you with your resume',
        timestamp: new Date()
      }
    ];

    // Set initial theme based on user preference
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // this.resumeBuilder.chat('', {}).subscribe(response => {
    //   this.messagess.push({ text: response.response, isUser: false });
    // });
  }

  ngOnInit(): void {
    // Subscribe to form value changes for filtering
    console.log('Form initialized:', 'functionni');
    this.personalInfoForm.get('city')?.valueChanges.subscribe(value => {
      this.filteredCities = this.filterItems(value, this.cities);
    });

    this.personalInfoForm.get('state')?.valueChanges.subscribe(value => {
      this.filteredStates = this.filterItems(value, this.states);
    });

    this.personalInfoForm.get('zipCode')?.valueChanges.subscribe(value => {
      this.filteredZipCodes = this.filterItems(value, this.zipCodes);
    });

    this.personalInfoForm.valueChanges.subscribe(values => {
      this.progressService.updateFormData(values);
    });

    // this.initializeChat();
    this.startInterview();
    this.resumeBuilder.startConversation().subscribe({
      next: (response) => {
        console.log('Conversation started:', response);
        if (response.message) {
          const message: Message = {
            id: Date.now().toString(),
            content: response.message,
            sender: 'ai',
            timestamp: new Date(),
            suggestions: response.suggestions
          };
          this.messages.push(message);
        }
        if (response.session_id) {
          this.session_id = response.session_id;
        }
        if (response.progress) {
          // this.progressService.setProgress({
          //   section: 'personalInfo',
          //   progress: (response.progress.current / response.progress.total) * 100
          // });
        }
      },
      error: (error) => {
        console.error('Failed to start conversation:', error);
        this.addMessage('system', 'Failed to start the conversation. Please refresh the page to try again.');
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeAllDropdowns();
    }
  }

  private closeAllDropdowns(): void {
    this.showCityDropdown = false;
    this.showStateDropdown = false;
    this.showZipCodeDropdown = false;
  }

  toggleCityDropdown(): void {
    this.showCityDropdown = !this.showCityDropdown;
    if (this.showCityDropdown) {
      this.showStateDropdown = false;
      this.showZipCodeDropdown = false;
    }
  }

  toggleStateDropdown(): void {
    this.showStateDropdown = !this.showStateDropdown;
    if (this.showStateDropdown) {
      this.showCityDropdown = false;
      this.showZipCodeDropdown = false;
    }
  }

  toggleZipCodeDropdown(): void {
    this.showZipCodeDropdown = !this.showZipCodeDropdown;
    if (this.showZipCodeDropdown) {
      this.showCityDropdown = false;
      this.showStateDropdown = false;
    }
  }

  private filterItems(value: string, items: string[]): string[] {
    const filterValue = value.toLowerCase();
    return items.filter(item => item.toLowerCase().includes(filterValue));
  }

  selectCity(city: string): void {
    this.personalInfoForm.patchValue({ city });
    this.showCityDropdown = false;
  }

  selectState(state: string): void {
    this.personalInfoForm.patchValue({ state });
    this.showStateDropdown = false;
  }

  selectZipCode(zipCode: string): void {
    this.personalInfoForm.patchValue({ zipCode });
    this.showZipCodeDropdown = false;
  }

  onNext(): void {
    if (this.personalInfoForm.valid) {
      const formData = {
        ...this.personalInfoForm.value,
        fullName: `${this.personalInfoForm.value.firstName} ${this.personalInfoForm.value.lastName}`.trim()
      };
      this.next.emit(formData);
    } else {
      // Mark all fields as touched to show validation messages
      Object.keys(this.personalInfoForm.controls).forEach(key => {
        this.personalInfoForm.get(key)?.markAsTouched();
      });
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  get firstName() { return this.personalInfoForm.get('firstName'); }
  get email() { return this.personalInfoForm.get('email'); }
  get phone() { return this.personalInfoForm.get('phone'); }

  // private initializeChat(): void {
  //   // Add initial AI message
  //   this.messages = [{
  //     id: '1',
  //     content: 'Hi! I\'m your AI assistant. I\'ll help you create an amazing resume. What would you like to know?',
  //     sender: 'ai',
  //     timestamp: new Date()
  //   }];
  // }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark');
  }

  private async processAIResponse(userMessage: string): Promise<void> {
    // Simulate AI thinking state
    await this.simulateAIState('thinking');
    
    // Add AI response
    this.messages.push({
      id: Date.now().toString(),
      content: 'I understand you want to discuss ' + userMessage + '. Let me help you with that.',
      sender: 'ai',
      timestamp: new Date()
    });
  }

  private async simulateAIState(state: Message['state'], duration: number = 1000): Promise<void> {
    // Update last AI message state
    const lastAiMessage = [...this.messages].reverse().find(m => m.sender === 'ai');
    if (lastAiMessage) {
      lastAiMessage.state = state;
    }
    await new Promise(resolve => setTimeout(resolve, duration));
  }

  selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    this.showSidebar = false; // Close sidebar on mobile after selection
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  autoResizeTextarea(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  toggleFileUpload(): void {
    // Implement file upload logic
  }

  toggleVoiceInput(): void {
    // Implement voice input logic
  }

  getStateIcon(state: Message['state']): any {
    switch (state) {
      case 'thinking': return faSpinner;
      case 'researching': return faSearch;
      case 'calling_api': return faCode;
      case 'generating': return faBook;
      default: return null;
    }
  }

  // Quick Actions
  summarizeConversation(): void {
    // Implement summarization logic
  }

  requestSources(): void {
    // Implement source request logic
  }

  requestExplanation(): void {
    // Implement explanation request logic
  }

  executeQuickAction(action: QuickAction): void {
    if (action && typeof action.action === 'function') {
      action.action();
    }
  }

  sendMessage() {
    if (!this.messageForm.valid) return;

    const userMessage = this.messageForm.get('message')?.value;
    if (!userMessage?.trim()) return;

    // Add user message to chat
    this.addMessage('user', userMessage);
    
    const sessionId = this.session_id;
    if (!sessionId) {
      console.error('No active session');
      this.addMessage('system', 'Error: No active session. Please refresh the page.');
      return;
    }

    // Clear the input after sending
    this.messageForm.reset();

    // Show loading state
    this.isProcessing = true;

    // Call the API
    this.resumeBuilder.continueConversation(sessionId, userMessage)
      .subscribe({
        next: (response) => {
          if (response.status === 'error') {
            this.handleError(response.error || 'An error occurred');
            return;
          }

          if (response.message) {
            const message: Message = {
              id: Date.now().toString(),
              content: response.message,
              sender: 'ai',
              timestamp: new Date(),
              suggestions: response.suggestions
            };
            this.messages.push(message);
          }

          // Update progress if provided
          if (response.progress) {
            // this.progressService.setProgress({
            //   section: 'personalInfo',
            //   progress: (response.progress.current / response.progress.total) * 100
            // });
          }

          if (response.status === 'complete') {
            this.handleConversationComplete(response);
          }

          // Store field ID for context
          if (response.field_id) {
            this.currentSection = response.field_id;
          }
        },
        error: (error) => {
          console.error('Conversation error:', error);
          this.addMessage('system', 'Sorry, there was an error processing your message. Please try again.');
          this.isProcessing = false;
        },
        complete: () => {
          this.isProcessing = false;
          this.scrollToBottom();
        }
      });
  }

  private handleConversationComplete(response: ConversationResponse) {
    if (response.resume_data) {
      // Store collected data
      this.progressService.updateFormData(response.resume_data);
      
      // Add completion message
      this.addMessage('system', 'Great! I have collected all the necessary information. Generating your resume...');

      // Store conversation history if provided
      if (response.conversation_history) {
        localStorage.setItem('conversation_history', JSON.stringify(response.conversation_history));
      }

      // Navigate to next step or show preview
      this.next.emit(response.resume_data);
    }
  }

  private async startInterview() {
    // Check if user is authenticated
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.initiateAgentConversation();
      } else {
        // this.messages.push({
        //   id: Date.now().toString(),
        //   content: 'Please log in to start creating your resume.',
        //   sender: 'system',
        //   timestamp: new Date()
        // });
      }
    });
  }

  private async initiateAgentConversation() {
    this.isLoading = true;
    try {
      const response = await this.http.post<AgentResponse>(
        `${environment.apiUrl}/resume/interview/start`,
        {}
      ).pipe(
        tap(res => {
          this.currentSection = res.section || '';
          this.addMessage('ai', res.message);  // Changed from 'agent' to 'ai'
          if (res.suggestions) {
            this.suggestions = res.suggestions;
          }
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(() => error);
        })
      ).toPromise();

    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
  }

  async sendMessageToAgent() {
    if (this.personalInfoForm.valid && this.currentMessage.trim()) {
      const userMessage = this.currentMessage.trim();
      this.addMessage('user', userMessage);
      this.currentMessage = '';
      this.isLoading = true;

      try {
        const response = await this.http.post<AgentResponse>(
          `${environment.apiUrl}/resume/interview/respond`,
          {
            message: userMessage,
            section: this.currentSection
          }
        ).pipe(
          tap(res => {
            this.addMessage('ai', res.message);  // Changed from 'agent' to 'ai'
            if (res.suggestions) {
              this.suggestions = res.suggestions;
            }
            if (res.completed) {
              this.interviewCompleted = true;
              this.handleInterviewCompletion();
            } else {
              this.currentSection = res.section || this.currentSection;
            }
          }),
          catchError(error => {
            this.handleError(error);
            return throwError(() => error);
          })
        ).toPromise();

      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  private addMessage(sender: 'user' | 'ai' | 'system', content: string, suggestions?: string[]) {
    const message: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      suggestions
    };
    this.messages.push(message);
    this.scrollToBottom();
  }

  private async handleInterviewCompletion() {
    try {
      // Trigger content generation
      const response = await this.http.post(
        `${environment.apiUrl}/resume/generate`,
        { messages: this.messages }
      ).pipe(
        tap(res => {
          // Navigate to next step or show preview
          this.handleGenerationComplete(res);
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(() => error);
        })
      ).toPromise();

    } catch (error) {
      this.handleError(error);
    }
  }

  private handleGenerationComplete(response: any) {
    // Add completion message
    this.addMessage('system', 'Resume content has been generated! Moving to preview...');
    // Navigate or emit event for parent component
  }

  private handleError(error: any) {
    console.error('Error:', error);
    this.addMessage('system', 'An error occurred. Please try again.');
  }

  // Helper method to apply suggestion
  applySuggestion(suggestion: string) {
    this.currentMessage = suggestion;
    this.sendMessageToAgent();
  }

  // Social login methods
  loginWithGoogle() {
    window.location.href = `${environment.apiUrl}/auth/google`;
  }

  loginWithLinkedIn() {
    window.location.href = `${environment.apiUrl}/auth/linkedin`;
  }

  loginWithGithub() {
    window.location.href = `${environment.apiUrl}/auth/github`;
  }
}

