export class OwnerInfo {
  constructor(public firstname: string,
              public lastname: string) {
  }

  public static fromDto(data: any): OwnerInfo {
    return new OwnerInfo(data.firstname, data.lastname);
  }

  toDto(): any {
    return {
      firstname: this.firstname,
      lastname: this.lastname
    };
  }
}
