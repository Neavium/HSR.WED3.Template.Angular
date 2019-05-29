import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavigationService} from '@app/core';

import {AuthService} from '../services/auth.service';
import {RegistrationInfo} from '../models/registration-info';

@Component({
  selector: 'wed-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {

  private hasError = false;
  private usernameAlreadyUsed = false;
  private passwordNotEqual = false;

  public login: string;
  public password: string;
  public passwordConfirm: string;
  public firstname: string;
  public lastname: string;

  public isProcessing = false;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService) {
  }

  ngOnInit() {
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          this.navigationSvc.goToDashboard();
        } else {
          this.navigationSvc.goToRegister();
          this.usernameAlreadyUsed = this.autSvc.hasRegisterError();
          this.hasError = this.autSvc.hasLoginError();
        }
      });
  }

  public doRegister(f: NgForm): void {
    if (f && f.valid) {
      this.isProcessing = true;
      this.hasError = false;
      this.usernameAlreadyUsed = false;
      if ( this.password === this.passwordConfirm ) {
        this.passwordNotEqual = false;

        this.autSvc.register(new RegistrationInfo(
          f.value.login,
          f.value.password,
          f.value.firstname,
          f.value.lastname));
      } else {
        this.passwordNotEqual = true;
      }
    }
  }

  public goToHome(): void {
    this.navigationSvc.goToHome();
  }
}
