import {TransactionInfo} from '../models/transaction-info';
import {TransactionResourceService} from '../resources/transaction-resource.service';
import {Transaction} from '../models/transaction';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TransactionService {


  constructor(private resource: TransactionResourceService) {
  }

  public doTransaction(transactionModel: TransactionInfo): void {
    this.resource.transaction(transactionModel).subscribe(
      (data: Transaction) => {
        console.log(data);
      }
    );
  }

  public getTransactions(): void {
    this.resource.getTransactions('2016-05-11T02:00:00.000Z',
      '2019-12-11T02:00:00.000Z', 1, 0).subscribe(
      (data: any) => {
        console.log('get transactions:');
        console.log(data);
      }
    );
  }
}
