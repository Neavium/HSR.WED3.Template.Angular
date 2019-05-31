export class TransactionInfo {
  constructor(public target: number,
              public amount: number) {
  }

  public static fromDto(data: any): TransactionInfo {
    return new TransactionInfo(data.target, data.amount);
  }

  toDto(): any {
    return {
      target: this.target,
      amount: this.amount
    };
  }
}
