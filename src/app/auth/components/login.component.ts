import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavigationService} from '@app/core';

import {AuthService} from '../services/auth.service';
import {LoginInfo} from '../models/login-info';

@Component({
  selector: 'wed-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  private backUrl;
  private hasError = false;

  public login: string;
  public password: string;

  public isProcessing = false;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService, route: ActivatedRoute) {
    route.params.subscribe(
      (p: Params) => this.backUrl = p.backUrl);
  }

  ngOnInit() {
    this.backUrl = '';
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          if (this.backUrl) {
            this.navigationSvc.goToHome();
          } else {
            this.navigationSvc.goToDashboard();
          }
        } else {
          this.hasError = this.autSvc.hasLoginError();
        }
      });
  }

  public goToHome(): void {
    this.navigationSvc.goToHome();
  }

  public doLogin(f: NgForm): void {
    this.hasError = false;
    if (f.value.password) {
      this.isProcessing = true;
      this.autSvc.login(new LoginInfo(f.value.login, f.value.password));
    }
  }

  public register(): void {
    this.navigationSvc.goToRegister();
  }
}
