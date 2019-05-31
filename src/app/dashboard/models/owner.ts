import {Account} from '../../auth/models/account';

export class Owner {
  constructor(public ownerId: string,
              public accountNr: number,
              public amount: number,
              public owner: Account) {
  }

  public static fromDto(data: any): Owner {
    return new Owner(data.ownerId, data.accountNr, data.amount, Account.fromDto(data.owner));
  }

  toDto(): any {
    return {
      ownerId: this.ownerId,
      accountNr: this.accountNr,
      amount: this.amount,
      owner: this.owner
    };
  }
}
