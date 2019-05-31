import {Component, OnInit} from '@angular/core';

import {NavigationService} from '@app/core';
import {Transaction} from '../models/transaction';
import {TransactionService} from '../services/transaction.service';

declare var $: any;


@Component({
  selector: 'wed-transactions',
  templateUrl: 'transactions.component.html',
  styleUrls: ['transactions.component.scss']
})

export class TransactionsComponent implements OnInit {

  private year;
  private month;

  private date: Date;

  private transactions: Transaction[];

  constructor(private transactionService: TransactionService, private navigationSvc: NavigationService) {

  }

  ngOnInit() {
    $('.ui.dropdown').dropdown();
    this.setDate();
  }

  public goToDashboard(): void {
    this.navigationSvc.goToDashboard();
  }

  public goToAllTransactions(): void {
    this.navigationSvc.goToAllTransactions();
  }

  public changeYear(): void {
    this.year = $('#yearDropdown').dropdown('get value');
    this.loadTransactions();
  }

  public changeMonth(): void {
    this.month = $('#monthDropdown').dropdown('get value');
    this.loadTransactions();
  }

  private setDate(): void {
    this.date = new Date();
    this.year = this.date.getFullYear();
    $('#yearDropdown').dropdown('set selected', this.year);
    this.month = this.date.getMonth();
    $('#monthDropdown').dropdown('set selected', this.month);
  }

  public loadTransactions(): void {
    if (this.year && this.month) {
      let date = new Date(Date.UTC(this.year, this.month, 1));
      const fromDate = date.toJSON();
      let adjustedMonth: number = this.month;
      adjustedMonth++;
      date = new Date(Date.UTC(this.year, adjustedMonth, 0, 23, 59, 59, 999));
      const toDate = date.toJSON();
      this.transactionService.getTransactions(fromDate, toDate, 0, 0);
      this.transactionService.queryResultChange.subscribe((response) => {
        this.transactions = response.result;
      });
    }
  }
}
