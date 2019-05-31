import {Injectable} from '@angular/core';
import {ResourceBase} from '@app/core';
import {HttpClient} from '@angular/common/http';
import {TransactionInfo} from '../models/transaction-info';
import {Observable, of} from 'rxjs';
import {Transaction} from '../models/transaction';
import {catchError, map} from 'rxjs/operators';
import {QueryResult} from '../models/query-result';


@Injectable()
export class TransactionResourceService extends ResourceBase {
  constructor(http: HttpClient) {
    super(http);
  }

  public transaction(model: TransactionInfo): Observable<Transaction> {
    return this.post('/accounts/transactions', model.toDto())
      .pipe(
        map((result: any) => {
          if (result) {
            return Transaction.fromDto(result);
          }
          return null;
        }),
        catchError((error: any) => of<Transaction>(null))
      );
  }

  public getTransactions(fromDate: string, toDate: string, count: number, skip: number): Observable<QueryResult> {
    if (fromDate && toDate) {
      return this.get(`/accounts/transactions?fromDate=${fromDate}&toDate=${toDate}&count=${count}&skip=${skip}`)
        .pipe(
          map((result: any) => {
            if (result) {
              return QueryResult.fromDto(result);
            }
            return null;
          }),
          catchError((error: any) => of<QueryResult>(null))
        );
    } else {
      return this.get(`/accounts/transactions?count=${count}&skip=${skip}`)
        .pipe(
          map((result: any) => {
            if (result) {
              return QueryResult.fromDto(result);
            }
            return null;
          }),
          catchError((error: any) => of<QueryResult>(null))
        );
    }
  }
}
