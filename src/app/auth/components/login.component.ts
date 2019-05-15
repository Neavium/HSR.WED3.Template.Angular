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
        }
      });
  }

  public doLogin(f: NgForm): boolean {
    if (f.value.password) {
      this.isProcessing = true;
      this.hasError = false;
      this.autSvc.login(new LoginInfo(f.value.login, f.value.password));
      this.ngOnInit();
      if ( this.autSvc.hasLoginError() ) {
        this.hasError = true;
      }
    }
    return false;
  }

  public register(): void {
    this.navigationSvc.goToRegister();
  }
}
