import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        }
        
        // Store the attempted URL for redirecting
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: this.router.url }
        });
        return false;
      })
    );
  }
}