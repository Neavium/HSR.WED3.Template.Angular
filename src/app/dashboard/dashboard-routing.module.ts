import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {DashboardcontentComponent} from './components/dashboardcontent.component';
import {TransactionsComponent} from './components/transactions.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // TODO: Add routing path for dashboard here...
      {path: 'transactions', component: TransactionsComponent},
      {path: '', component: DashboardcontentComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes) // !forChild() important
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
