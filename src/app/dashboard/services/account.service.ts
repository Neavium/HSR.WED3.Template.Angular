import {Injectable} from '@angular/core';
import {AccountResourceService} from '../resources/account-resource.service';

@Injectable({providedIn: 'root'})
export class AccountService {

  constructor(private resource: AccountResourceService) {
  }

  public getOwnerAccountInfo(): void {
    this.resource.getOwnerAccountInfo().subscribe(
      (data: any) => {
        console.log('owner info:');
        console.log(data);
      }
    );
  }

  public getAccountInfo(): void {
    this.resource.getAccountInfo(1000004).subscribe(
      (data: any) => {
        console.log('account info:');
        console.log(data);
      }
    );
  }
}
