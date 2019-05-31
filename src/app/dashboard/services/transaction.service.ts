import {TransactionInfo} from '../models/transaction-info';
import {TransactionResourceService} from '../resources/transaction-resource.service';
import {Transaction} from '../models/transaction';
import {EventEmitter, Injectable} from '@angular/core';
import {QueryResult} from '../models/query-result';

@Injectable({providedIn: 'root'})
export class TransactionService {

  private transaction: Transaction;
  private queryResult: QueryResult;

  public transactionChange: EventEmitter<Transaction> = new EventEmitter<Transaction>();
  public queryResultChange: EventEmitter<QueryResult> = new EventEmitter<QueryResult>();

  constructor(private resource: TransactionResourceService) {
  }

  public getTransaction(): Transaction {
    return this.transaction;
  }

  public getQueryResult(): QueryResult {
    return this.queryResult;
  }

  public doTransaction(transactionModel: TransactionInfo): void {
    this.resource.transaction(transactionModel).subscribe(
      (data: Transaction) => {
        if (data) {
          this.transaction = data;
          this.transactionChange.emit(this.getTransaction());
        }
      }
    );
  }

  public getTransactions(fromDate: string, toDate: string, count: number, skip: number): void {
    this.resource.getTransactions(fromDate, toDate, count, skip).subscribe(
      (data: QueryResult) => {
        this.queryResult = data;
        this.queryResultChange.emit(this.getQueryResult());
      }
    );
  }
}
