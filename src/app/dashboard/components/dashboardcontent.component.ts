import {Component, OnInit} from '@angular/core';

import {NavigationService} from '@app/core';

import {NgForm} from '@angular/forms';
import {TransactionService} from '../services/transaction.service';
import {TransactionInfo} from '../models/transaction-info';
import {AccountService} from '../services/account.service';
import {Owner} from '../models/owner';
import {AccountInfo} from '../models/account-info';
import {Transaction} from '../models/transaction';


@Component({
  selector: 'wed-dashboardcontent',
  templateUrl: 'dashboardcontent.component.html',
  styleUrls: ['dashboardcontent.component.scss']
})
export class DashboardcontentComponent implements OnInit {

  private from;
  private to;
  private message;
  private amount;

  private formValid = true;
  private amountValid = true;
  private transactionSuccess = false;
  private owner: Owner;
  private latestTransactions: Transaction[];

  constructor(private transactionService: TransactionService, private accountService: AccountService,
              private navigationSvc: NavigationService) {
  }

  ngOnInit() {
    this.accountService.getOwnerAccountInfo();
    this.accountService.ownerChange.subscribe((owner) => {
      this.owner = owner;
      this.from = this.owner.accountNr + ' [' + this.owner.amount.toFixed(2) + ' CHF]';
    });
    this.transactionService.getTransactions(null, null, 3, 0);
    this.transactionService.queryResultChange.subscribe((response) => {
      this.latestTransactions = response.result;
    });
  }

  public doTransaction(f: NgForm): void {
    if (f && f.valid && this.formValid) {
      this.transactionService.doTransaction(new TransactionInfo(f.value.to, f.value.amount));
      this.transactionService.transactionChange.subscribe(() => {
        this.accountService.getOwnerAccountInfo();
        this.accountService.ownerChange.subscribe((owner) => {
          this.owner = owner;
          this.transactionSuccess = true;
          this.from = this.owner.accountNr + ' [' + this.owner.amount.toFixed(2) + ' CHF]';
        });
      });
      this.transactionService.getTransactions(null, null, 3, 0);
      this.transactionService.queryResultChange.subscribe((response) => {
        this.latestTransactions = response.result;
      });
    }
  }

  public goToDashboard(): void {
    this.navigationSvc.goToDashboard();
  }

  public goToAllTransactions(): void {
    this.navigationSvc.goToAllTransactions();
  }

  public getAccount(): void {
    this.accountService.getAccountInfo(this.to);
    this.accountService.accountInfoChange.subscribe((accountInfo) => {
      this.validateTo(accountInfo);
    });
  }

  public hasAmount(): boolean {
    return this.amount === undefined || this.amount <= this.owner.amount;
  }

  public validateTo(accountInfo: AccountInfo): void {
    if (accountInfo == null) {
      this.formValid = false;
      this.message = 'Unknown account number specified.';
    } else if (this.owner.accountNr === accountInfo.accountNr) {
      this.formValid = false;
      this.message = 'Please specify the target account number.';
    } else {
      this.formValid = true;
      this.message = accountInfo.owner.firstname + ' ' + accountInfo.owner.lastname;
    }
  }

  public validateAmount(): void {
    this.amountValid = (this.amount >= 0.05) && (((Math.round(100 * this.amount)) % 5) === 0);
  }

  public startOver(): void {
    this.transactionSuccess = false;
  }
}
