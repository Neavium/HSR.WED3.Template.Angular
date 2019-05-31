export class Transaction {
  constructor(public from: number,
              public target: number,
              public amount: number,
              public total: number,
              public date: string) {
  }

  public static fromDto(data: any): Transaction {
    const date = new Date(data.date);
    let adjustedDay: string;
    if (date.getDay() < 10) {
      adjustedDay = '0' + date.getDay();
    } else {
      adjustedDay = date.getDay().toString();
    }
    let adjustedMonth: string;
    if (date.getMonth() < 9) {
      adjustedMonth = '0' + (date.getMonth() + 1);
    } else {
      adjustedMonth = (date.getMonth() + 1).toString();
    }
    const adjustedDate: string = adjustedDay + '.' + adjustedMonth + '.' + date.getFullYear();
    return new Transaction(data.from, data.target, data.amount, data.total, adjustedDate);
  }

  toDto(): any {
    return {
      from: this.from,
      target: this.target,
      amount: this.amount,
      total: this.total,
      date: this.date
    };
  }
}
