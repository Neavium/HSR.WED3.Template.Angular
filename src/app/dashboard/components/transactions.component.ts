import {Component, OnInit} from '@angular/core';

import {NavigationService} from '@app/core';
import {ActivatedRoute} from '@angular/router';

declare var $: any;


@Component({
  selector: 'wed-transactions',
  templateUrl: 'transactions.component.html',
  styleUrls: ['transactions.component.scss']
})

export class TransactionsComponent implements OnInit {

  constructor(private navigationSvc: NavigationService) {

  }

  ngOnInit() {
    $('.ui.dropdown').dropdown();
  }

  public goToDashboard(): void {
    this.navigationSvc.goToDashboard();
  }

  public goToAllTransactions(): void {
    this.navigationSvc.goToAllTransactions();
  }
}
