import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'wed-latest-transaction-list-entry',
  templateUrl: 'latestTransactionListEntry.component.html',
  styleUrls: ['latestTransactionListEntry.component.scss']
})
export class LatestTransactionListEntryComponent implements OnInit {

  public user: Account;

  constructor() {
  }

  ngOnInit() {
  }
}
