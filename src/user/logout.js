import {AuthenticationService} from '../services/AuthenticationService';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';


@inject(AuthenticationService, Router)
export class Logout {
  constructor(authenticationService, router) {
    this.authService = authenticationService;
    this.router = router;
  }

  logout() {
    this.authService.logout();
    this.router.navigate('welcome');
  }

  cancel() {
    this.router.navigate('welcome');
  }
}
