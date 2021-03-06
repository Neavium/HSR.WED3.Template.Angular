import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class NavigationService {

  public goToUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  // TODO: add other routing targets, if needed

  public goToHome(): void {
    this.goToUrl('/');
  }

  public goToDashboard(): void {
    this.goToUrl('/dashboard');
  }

  public goToRegister(): void {
    this.goToUrl('/welcome/register');
  }

  public goToAllTransactions(): void {
    this.goToUrl('/dashboard/transactions');
  }

  constructor(private router: Router) {
  }
}
