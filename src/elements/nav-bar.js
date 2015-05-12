import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthenticationService} from '../services/AuthenticationService';

@inject(EventAggregator, AuthenticationService)
@bindable('router')
export class NavBar {
  currentRoute = "";
  isLoggedIn = false;

  constructor(ea, authService) {
    this.ea = ea;
    this.authService = authService;


    this.ea.subscribe('authenticationChanged', () => {
      this.isLoggedIn = this.authService.isAuthenticated();
    });

    this.ea.subscribe('routeChanged', (nextInstructions) => {
      this.handleRouteChanged(nextInstructions);
    });


    this.isLoggedIn = this.authService.isAuthenticated();
  }

  handleRouteChanged(nextInstructions) {
    var instruction = nextInstructions[0];
    this.currentRoute = instruction.config.route.toLowerCase();
    this.isLoggedIn = this.authService.isAuthenticated();
  }
}
