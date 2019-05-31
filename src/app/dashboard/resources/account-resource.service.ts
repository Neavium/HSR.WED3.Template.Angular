import {Injectable} from '@angular/core';
import {ResourceBase} from '@app/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Owner} from '../models/owner';
import {catchError, map} from 'rxjs/operators';
import {AccountInfo} from '../models/account-info';


@Injectable()
export class AccountResourceService extends ResourceBase {
  constructor(http: HttpClient) {
    super(http);
  }

  public getOwnerAccountInfo(): Observable<Owner> {
    return this.get('/accounts/')
      .pipe(
        map((result: any) => {
          if (result) {
            return Owner.fromDto(result);
          }
          return null;
        }),
        catchError((error: any) => of<Owner>(null))
      );
  }

  public getAccountInfo(accountNr: number): Observable<AccountInfo> {
    return this.get(`/accounts/${accountNr}`)
      .pipe(
        map((result: any) => {
          if (result) {
            return AccountInfo.fromDto(result);
          }
          return null;
        }),
        catchError((error: any) => of<AccountInfo>(null))
      );
  }
}
