import {Component, OnInit} from '@angular/core';

import {NavigationService} from '@app/core';
import {ActivatedRoute} from '@angular/router';

import {NgForm} from '@angular/forms';
import {TransactionService} from '../services/transaction.service';
import {TransactionInfo} from '../models/transaction-info';
import {AccountService} from '../services/account.service';


@Component({
  selector: 'wed-dashboardcontent',
  templateUrl: 'dashboardcontent.component.html',
  styleUrls: ['dashboardcontent.component.scss']
})
export class DashboardcontentComponent implements OnInit {

  private from;
  private to;
  private amount;

  constructor(private transactionService: TransactionService, private accountService: AccountService,
              private navigationSvc: NavigationService) {
  }

  ngOnInit() {
  }

  public doTransaction(f: NgForm): void {
    this.transactionService.doTransaction(new TransactionInfo(f.value.to, f.value.amount));
  }

  public getTransactions(): void {
    this.transactionService.getTransactions();
  }

  public goToDashboard(): void {
    this.navigationSvc.goToDashboard();
  }

  public goToAllTransactions(): void {
    this.getTransactions();
    this.accountService.getOwnerAccountInfo();
    this.accountService.getAccountInfo();
    this.navigationSvc.goToAllTransactions();
  }
}
