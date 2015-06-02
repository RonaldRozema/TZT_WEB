import {AuthenticationService} from 'services/authenticationservice';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(AuthenticationService)
export class App {
  constructor(authenticationservice) {
    this.authService = authenticationservice;
  }

  configureRouter(config, router){
    config.title = 'TZT';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['','welcome'],  moduleId: './welcome', nav: true, title:'Home' },
      { route: 'package', moduleId: './shipping/package', nav: true, title: 'Pakket verzenden' },
      { route: 'login', moduleId: './user/login', nav: true, title: 'Inloggen' },
      { route: 'register', moduleId: './user/register', nav: true, title: 'Registreer' },
      { route: 'profile', moduleId: './user/profile', nav: true, title: 'Profiel' },
      { route: 'edit-profile', moduleId: './user/edit-profile', nav: false, title: 'Profiel bewerken' },
      { route: 'contact', moduleId: './relation/contact', nav: true, title: 'Contacten' },
      { route: 'create-client', moduleId: './relation/create-client', nav: false, title: 'Contact aanmaken' },
      { route: 'invoice', moduleId: './finance/invoice', nav: true, title: 'Facturen' },
      { route: 'package/:tracking_number', moduleId: './shipping/package-status', nav: false, title: 'Pakket' },
      { route: 'accept-invoice/:shipment_id', moduleId: './finance/accept-invoice', nav: false, title:'Factuur' },
      { route: 'accept-invoice/:shipment_id', moduleId: './finance/accept-invoice', nav: false, title:'Factuur' },
      { route: 'pay-invoice/:shipment_id', moduleId: './finance/pay-invoice', nav: false, title: 'Betaal factuur' },
      { route: 'label/:tracking_number', moduleId: './shipping/label', nav: false, title: 'Label' },
      { route: 'logout', moduleId: './user/logout', nav: true, title: 'Uitloggen' }
    ]);

    this.router = router;
  }
}

@inject(AuthenticationService, EventAggregator)
class AuthorizeStep {

  constructor(authenticationservice, ea) {
    this.authService = authenticationservice;
    this.ea = ea;
  }

  run(routingContext, next) {
    if (routingContext.nextInstructions.some(i => i.config.auth)) {
      var isLoggedIn = this.authService.isAuthenticated();
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    this.ea.publish('routeChanged', routingContext.nextInstructions);

    return next();
  }
}
