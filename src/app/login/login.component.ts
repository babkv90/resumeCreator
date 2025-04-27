import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  isLoginMode = true;
  isLoading = false;
  authForm;

  constructor(private fb: FormBuilder,private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''] // Only used in register mode
    });
  }



  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    if (!this.isLoginMode) {
      this.authForm.get('name')?.setValidators([Validators.required]);
    } else {
      this.authForm.get('name')?.clearValidators();
    }
    this.authForm.get('name')?.updateValueAndValidity();
  }

  onSubmit() {
    this.router.navigate(['/user_dashboard']);
    if (this.authForm.invalid) return;
    
    this.isLoading = true;
    const { email, password, name } = this.authForm.value;
    
    // Simulate API call
    setTimeout(() => {
      console.log(this.isLoginMode ? 'Logging in' : 'Registering', { email, password, name });
      this.isLoading = false;
    }, 1500);
  }

  socialLogin(provider: string) {
    console.log(`Logging in with ${provider}`);
    // Implement OAuth logic here
  }
}