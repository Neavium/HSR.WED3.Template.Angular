import {OwnerInfo} from './owner-info';

export class AccountInfo {
  constructor(public accountNr: number,
              public owner: OwnerInfo) {
  }

  public static fromDto(data: any): AccountInfo {
    return new AccountInfo(data.accountNr, OwnerInfo.fromDto(data.owner));
  }

  toDto(): any {
    return {
      accountNr: this.accountNr,
      owner: this.owner
    };
  }
}
