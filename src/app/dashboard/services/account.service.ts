import {EventEmitter, Injectable} from '@angular/core';
import {AccountResourceService} from '../resources/account-resource.service';
import {Owner} from '../models/owner';
import {AccountInfo} from '../models/account-info';

@Injectable({providedIn: 'root'})
export class AccountService {

  private owner: Owner;
  private accountInfo: AccountInfo;

  public ownerChange: EventEmitter<Owner> = new EventEmitter<Owner>();
  public accountInfoChange: EventEmitter<AccountInfo> = new EventEmitter<AccountInfo>();

  constructor(private resource: AccountResourceService) {
  }

  public getOwner(): Owner {
    return this.owner;
  }

  public getAccount(): AccountInfo {
    return this.accountInfo;
  }

  public getOwnerAccountInfo(): void {
    this.resource.getOwnerAccountInfo().subscribe(
      (data: Owner) => {
        this.owner = data;
        this.ownerChange.emit(this.getOwner());
      }
    );
  }

  public getAccountInfo(accountNr: number): void {
    this.resource.getAccountInfo(accountNr).subscribe(
      (data: AccountInfo) => {
        this.accountInfo = data;
        this.accountInfoChange.emit(this.getAccount());
      }
    );
  }
}
