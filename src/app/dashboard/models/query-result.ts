import {Query} from './query';
import {Transaction} from './transaction';

export class QueryResult {
  constructor(public query: Query,
              public result: Transaction[]) {
  }

  public static fromDto(data: any): QueryResult {
    const transactions: Transaction[] = [];
    for (const transaction of data.result) {
      transactions.push(Transaction.fromDto(transaction));
    }
    return new QueryResult(Query.fromDto(data.query), transactions);
  }

  toDto(): any {
    return {
      query: this.query,
      result: this.result
    };
  }
}
