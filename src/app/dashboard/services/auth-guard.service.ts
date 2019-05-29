import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }
  canLoad(route: Route): boolean {
    if (!this.authService.hasCredentials) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
