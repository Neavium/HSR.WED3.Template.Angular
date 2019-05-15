import {Injectable, EventEmitter} from '@angular/core';

import {isBlank} from '@app/core';

import {Account} from '../models/account';
import {RegistrationInfo} from '../models/registration-info';
import {LoginInfo} from '../models/login-info';
import {Credential} from '../models/credential';
import {AuthResourceService} from '../resources/auth-resource.service';

import {SecurityTokenStore} from './credential-management/security-token-store';


@Injectable({providedIn: 'root'})
export class AuthService {

  private registerError: boolean;
  private loginError: boolean;

  public authenticatedUserChange: EventEmitter<Account> = new EventEmitter<Account>();

  public get authenticatedUser(): Account {
    return this.authUser;
  }

  private authUser: Account = null;

  constructor(private resource: AuthResourceService, private tokenStore: SecurityTokenStore) {
    if (tokenStore.storedValue) {
      this.authUser = tokenStore.storedValue.owner;
    }
  }

  public get hasCredentials(): boolean {
    return !isBlank(this.authenticatedUser);
  }

  public register(registerModel: RegistrationInfo): void {
    this.resource.register(registerModel).subscribe(
      (data: Account) => {
        console.log('auth service data: ' + data);
        if ( data ) {
          this.login(registerModel);
        } else {
          console.log('register failed!');
          // TODO handle bad case
          this.registerError = true;
        }
      });
  }

  public login(loginModel: LoginInfo): void {
    this.resource.login(loginModel).subscribe(
      (data: Credential) => {
        if ( data ) {
          this.tokenStore.storedValue = data;
          this.authUser = !isBlank(data) ? data.owner : null;
          this.authenticatedUserChange.emit(this.authenticatedUser);
        } else {
          console.log('login failed');
          // TODO handle bad case
          this.loginError = true;
        }
      });
  }

  public logout(): void {
    this.tokenStore.storedValue = null;
    this.authUser = null;
    this.authenticatedUserChange.emit(null);
  }

  public hasRegisterError(): boolean {
    return this.registerError;
  }

  public hasLoginError(): boolean {
    return this.loginError;
  }
}
