export class Query {
  constructor(public resultCount: number,
              public count: number,
              public skip: number,
              public fromDate: string,
              public toDate: string) {
  }

  public static fromDto(data: any): Query {
    return new Query(data.resultCount, data.count, data.skip, data.fromDate, data.toDate);
  }

  toDto(): any {
    return {
      resultCount: this.resultCount,
      count: this.count,
      skip: this.skip,
      fromDate: this.fromDate,
      toDate: this.toDate
    };
  }
}
