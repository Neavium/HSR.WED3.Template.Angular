import {Component, OnInit} from '@angular/core';

import {NavigationService} from '@app/core';
import {ActivatedRoute, Params} from '@angular/router';

import {AuthService} from '../../auth/services/auth.service';


@Component({
  selector: 'wed-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private backUrl;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService, route: ActivatedRoute) {
    route.params.subscribe(
      (p: Params) => this.backUrl = p.backUrl);
  }

  ngOnInit() {
    this.backUrl = '';
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        if (credentials) {
          if (this.backUrl) {
            this.navigationSvc.goToHome();
          } else {
            this.navigationSvc.goToDashboard();
          }
        }
      });
  }
}
