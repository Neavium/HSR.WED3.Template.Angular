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
          this.hasError = true;
        }
      });
  }

  public doRegister(f: NgForm): boolean {
    if (f && f.valid) {
      this.isProcessing = true;
      if ( this.password === this.passwordConfirm ) {
        this.passwordNotEqual = false;
        this.autSvc.register(new RegistrationInfo(
          f.value.login,
          f.value.password,
          f.value.firstname,
          f.value.lastname));
        this.ngOnInit();
        if ( this.autSvc.hasRegisterError() ) {
          this.usernameAlreadyUsed = true;
        } else if ( this.autSvc.hasLoginError() ) {
          this.hasError = true;
        }
      } else {
        this.passwordNotEqual = true;
      }
    }
    return false;
  }
}
