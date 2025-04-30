import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-callback',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-300">Completing authentication...</p>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get tokens from URL parameters
    this.route.queryParams.subscribe(params => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];
      const error = params['error'];

      if (error) {
        // Handle error case
        this.router.navigate(['/login'], { 
          queryParams: { error: 'auth_failed' }
        });
        return;
      }

      if (accessToken && refreshToken) {
        // Store tokens and redirect
        this.authService.setTokens(accessToken, refreshToken);
        
        // Get return URL or go to dashboard
        const returnUrl = localStorage.getItem('returnUrl') || '/resume-builder';
        localStorage.removeItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      } else {
        // Missing tokens, redirect to login
        this.router.navigate(['/login']);
      }
    });
  }
}